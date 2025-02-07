import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwtPayload.id,
        },
        select: {
          id: true,
          email: true,
          role: true,
          firstname: true,
          lastname: true,
        },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;

import cloudinary from '../services/cloudinary.js';

export const uploadMediaFromCloudinary = async (filePath) => {
  try {
    const uploadedMedia = await cloudinary.uploader.upload(filePath);
    return uploadedMedia.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'upload du média");
  }
};

export const deleteMediaFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) {
      throw new Error("L'URL du fichier est manquante");
    }
    const match = fileUrl.match(/\/([^\/]+)\.[a-z]+$/);
    const publicId = match ? match[1] : null;
    if (!publicId) {
      throw new Error("Impossible de récupérer l'identifiant du fichier");
    }
    await cloudinary.uploader.destroy(publicId);
    console.log(`Image supprimée avec succès de Cloudinary : ${publicId}`);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de l'image de Cloudinary : ${publicId}`,
      error
    );
    throw new Error("Échec de la suppression de l'image");
  }
};

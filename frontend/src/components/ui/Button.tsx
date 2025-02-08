import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  bgColor: string;
  textColor: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={
        props.bgColor + " " + props.textColor + " py-2 px-4 rounded-lg"
      }
    >
      {props.children}
    </button>
  );
};

export default Button;

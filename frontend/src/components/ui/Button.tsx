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
      style={{ backgroundColor: props.bgColor, color: props.textColor }}
    >
      {props.children}
    </button>
  );
};

export default Button;

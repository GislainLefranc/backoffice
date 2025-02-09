import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React, { FC } from "react";
import "./index.css";
interface CustomProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  margin?: string;
  backgroundColor?: string;
  width?: string
}

export const Button: FC<CustomProps> = ({ text, onClick, margin, width, backgroundColor = "#2e16b1", type }) => {
  return (
    <button type={type} style={{ margin, width, backgroundColor }} onClick={onClick} className="main-button">
      {text}
    </button>
  );
};

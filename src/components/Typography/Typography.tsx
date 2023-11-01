import { FC } from "react";
import "./index.css";

interface Props {
  text: string;
  width?: string;
  margin?: string;
}

export const Typography: FC<Props> = ({ text, width, margin }) => {
  return (
    <h2 style={{ width, margin }} className="typography">
      {text}
    </h2>
  );
};

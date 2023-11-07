import React, { FC } from "react";
import "./index.css";

interface Props {
  width?: string;
  active: boolean;
  children: React.ReactNode;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: FC<Props> = ({ active, setActive, children, width }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
        style={{ width }}
      >
        {children}
      </div>
    </div>
  );
};

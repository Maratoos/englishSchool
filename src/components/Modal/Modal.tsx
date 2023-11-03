import React, { FC } from "react";
import "./index.css";
import crossMark from "../../assets/icons/crossMark.svg"

interface Props {
  children: React.ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: FC<Props> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={crossMark} className="modal__crossMark" onClick={() => setActive(false)} alt="" />
        {children}
      </div>
    </div>
  );
};

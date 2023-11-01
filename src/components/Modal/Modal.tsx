import { FC } from "react";
import { Button } from "../Button/Button";
import "./index.css";

export const Modal: FC = () => {
  return (
    <div className="modal__background">
      <div className="modal__inner">
        <p>ЗДЕСЬ БУДУТ УКАЗАНЫ КОНТАКТЫ</p>
        <p>ЗДЕСЬ БУДУТ УКАЗАНЫ КОНТАКТЫ</p>
        <p>ЗДЕСЬ БУДУТ УКАЗАНЫ КОНТАКТЫ</p>
      </div>
      <Button text="Закрыть модалку" />
    </div>
  );
};

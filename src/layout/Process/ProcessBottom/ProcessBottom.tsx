import { FC } from "react";
import "./index.css";
import heartEmoji from "../../../assets/images/heartEmoji.png"

export const ProcessBottom: FC = () => {
  return (
    <section className="processBottom__container">
      <div className="processBottom__innerContainer">
        <div className="processBottom__image-outer">
          <img loading="lazy" src={heartEmoji} alt="" />
        </div>
        <div className="processBottom__desc-outer">
          <h3>Помощь и поддержка</h3>
          <span>
            Если в процессе обучения возникнут сложности, ты всегда сможешь
            задать вопрос своему куратору. Чтобы связаться - оставь свой номер или телеграм ник
          </span> 
          <p>
            Раз в несколько уроков ты будешь получать большое задание, которое
            нужно будет сдавать на проверку. Куратор внимательно изучит его, и если
            найдет ошибки то проработает с вами эту тему.
          </p>
        </div>
      </div>
    </section>
  );
};

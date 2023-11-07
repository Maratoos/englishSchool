import { FC } from "react";
import learnEmoji from "../../../assets/images/learnEmoji.png";
import "../learn.css";
import { Typography } from "../../../components/Typography/Typography";

const subjectsItems: Array<{
  text: string;
  buttonColor: string;
  buttonWidth: string;
}> = [
  {
    text: "Cложные темы на простых примерах",
    buttonColor: "#4B77B9",
    buttonWidth: "340px",
  },
  {
    text: "Лексика",
    buttonColor: "#5096FF",
    buttonWidth: "100px",
  },
  {
    text: "Разговорные навыки",
    buttonColor: "#530FAD",
    buttonWidth: "230px",
  },
  {
    text: "Понимание и Аудирование",
    buttonColor: "#4F2982",
    buttonWidth: "258px",
  },
  {
    text: "Узкопрофильные темы",
    buttonColor: "#330570",
    buttonWidth: "220px",
  },
  {
    text: "Чтение и Понимание",
    buttonColor: "#996AD6",
    buttonWidth: "200px",
  },
  {
    text: "Письмо",
    buttonColor: "#8243D6",
    buttonWidth: "100px",
  },
];

export const LearnSubjects: FC = () => {
  
  return (
    <div className="learn__subjects">
      <Typography text="Чему ты научишься:" margin="73px 0 0 0" />
      <span className="learn__subject-smallText">60% Разговорной речи и 40% грамматики</span>
      <div className="learn__subjects-about">
        <img className="learn__subjects-image" src={learnEmoji} alt="" />
        <div className="learn__subjects-itemsHolder">
          <div className="learn__subjects-items">
            {subjectsItems.map((item) => (
              <div
                style={{
                  // width: item.buttonWidth,
                  backgroundColor: item.buttonColor,
                }}
                className="learn__subjects-item"
                key={item.text}
              >
                <p className="learn__subjects-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

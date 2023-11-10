import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "@mui/material";
import "./index.css";

export const AfterQuiz: FC = () => {
  const { currentLevel, correctAnswers } = useAppSelector((quiz) => quiz.quiz);
  return (
    <>
      <div className="afterQuiz">
        <div>
          <p className="afterQuiz__level">{currentLevel}</p>
          <p className="afterQuiz__description">{`Поздравляю, твой уровень ${currentLevel}, ты набрал ${correctAnswers} из 30 ответов, отличная работа`}</p>
          <p className="afterQuiz__description">
            Также тебе доступна моя специальная программа обучения
          </p>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Button sx={{ width: "60%" }} variant="contained" color="secondary">
          <a
            href="https://firebasestorage.googleapis.com/v0/b/faraprism.appspot.com/o/FaraPrism%20guide.pdf?alt=media&token=64273e93-c7c9-4842-ad0a-38f8e69bfc70"
            target="_blank"
            download
            className="button__link"
          >
            Скачать
          </a>
        </Button>
      </div>
    </>
  );
};

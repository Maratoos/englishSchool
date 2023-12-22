import { FC } from "react";
import "./index.css";
import { Button } from "../../../components/Button/Button";

interface Props {
  setQuizActive: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}

export const BeforeQuiz: FC<Props> = ({ setQuizActive, disabled }) => {
  return (
    <div className="beforeQuiz">
      <p className="beforeQuiz__text">
        Тест состоит из 30 вопросов с 4 вариантами ответа
      </p>

      <p className="beforeQuiz__text">
        Ограничений по времени нет, отвечайте максимально честно
      </p>

      <Button
        disabled={disabled}
        onClick={() => setQuizActive(true)}
        margin="20px 0 0 0"
        width="150px"
        text="Начать тест"
      />

      {disabled && (
        <p className="beforeQuiz__text">
          Загружаем тест...
        </p>
      )}
    </div>
  );
};

import React, { ChangeEvent, FC, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./index.css";
import { Button } from "@mui/material";
import { IQuiz, IUserAnswer } from "../../../models/models";
import {
  countCorrectAnswers,
  countUserLevel,
  setUserAnswers,
} from "../../../store/reducers/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Typography from "@mui/material/Typography/Typography";

interface Props {
  quiz: IQuiz;
  setCurrentQuizId: React.Dispatch<React.SetStateAction<number>>;
  setQuizActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Quiz: FC<Props> = ({ quiz, setCurrentQuizId, setQuizActive }) => {
  const [currentAnswer, setCurrentAnswer] = useState<IUserAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userAnswers } = useAppSelector((quiz) => quiz.quiz);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = quiz.options.find(
      (option) => option.answer === e.target.value
    );

    if (selectedOption) {
      setCurrentAnswer({
        answer: selectedOption.answer,
        answerIsCorrect: selectedOption.answerIsCorrect,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentAnswer) {
      dispatch(setUserAnswers(currentAnswer));
      setCurrentAnswer(null);
      setError(null);
      setCurrentQuizId((prev) => prev + 1);
    } else {
      setError("Выберите один из вариантов ответа");
    }

    if (userAnswers.length >= 29) {
      dispatch(countCorrectAnswers());
      dispatch(countUserLevel());
      setQuizActive(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz">
      <FormControl sx={{ width: "80%" }}>
        <FormLabel
          sx={{
            fontFamily: "Gilroy",
            fontSize: "20px",
            textAlign: "center",
            mb: "10px",
          }}
          className="quiz__label"
          id="demo-controlled-radio-buttons-group"
        >
          {quiz.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={currentAnswer ? currentAnswer.answer : ""}
          onChange={handleChange}
          className="quiz__radioGroup"
        >
          {quiz.options.map((item) => (
            <FormControlLabel
              className="quiz__radioGroup-item"
              key={item.answer}
              value={item.answer}
              control={<Radio />}
              label={item.answer}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <Button type="submit" variant="contained">
          Следующий вопрос
        </Button>
        {error && <Typography color="red">{error}</Typography>}
      </div>
    </form>
  );
};

import { FC, useState } from "react";
import "./greeting.css";
import { Button } from "../../components/Button/Button";
import { useSpring, animated } from "@react-spring/web";
import { Modal } from "../../components/Modal/Modal";
import { Quiz } from "./Quiz/Quiz";
import { useDevice } from "../../hooks/UseDevice";
import { useAppSelector } from "../../hooks/redux";
import { BeforeQuiz } from "./Quiz/BeforeQuiz";
import { AfterQuiz } from "./Quiz/AfterQuiz";
import { getCollection } from "../../hooks/getCollection";
import { IQuiz } from "../../models/models";

export const Greeting: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [currentQuizId, setCurrentQuizId] = useState<number>(0);
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const { documents } = getCollection<IQuiz>("quiz");
  const { currentLevel } = useAppSelector((quiz) => quiz.quiz);
  const mobileButton = useDevice(400);

  const [bigTextProps] = useSpring(
    () => ({
      from: { x: -500, opacity: -2 },
      to: { x: 0, opacity: 1 },
      delay: 200,
    }),
    []
  );

  const [smallTextProps] = useSpring(
    () => ({
      from: { x: 3000, opacity: -2 },
      to: { x: 0, opacity: 1 },
      delay: 300,
    }),
    []
  );

  return (
    <>
      <section id="greeting" className="greeting">
        <div className="greeting__inner">
          <div className="greeting__description">
            <animated.h1 style={bigTextProps} className="greeting__text">
              Welcome to FaraPrism English School! Я и мои опытные преподаватели
              научим тебя любить английский язык. Присоединяйся к нашему
              дружному сообществу и достигай успеха в английском. Ждем тебя на
              уроке.
            </animated.h1>
            <animated.div style={smallTextProps} className="greeting__test">
              <Button
                onClick={() => setModalActive(true)}
                text="Проверь свой уровень тут"
                width={mobileButton ? "250px" : "350px"}
              />
            </animated.div>
          </div>
        </div>
      </section>
      <Modal active={modalActive} setActive={setModalActive}>
        {quizActive && !currentLevel && currentQuizId < 30 && (
          <Quiz
            setCurrentQuizId={setCurrentQuizId}
            quiz={documents[currentQuizId]}
            setQuizActive={setQuizActive}
          />
        )}
        {!quizActive && !currentLevel && (
          <BeforeQuiz
            disabled={!documents.length}
            setQuizActive={setQuizActive}
          />
        )}
        {!quizActive && currentLevel && <AfterQuiz />}
      </Modal>
    </>
  );
};

import { FC, useState } from "react";
import "./greeting.css";
import { Button } from "../../components/Button/Button";
import { useSpring, animated } from "@react-spring/web";
// import greeetingImage from "../../assets/images/greetingImage.png";
import { Modal } from "../../components/Modal/Modal";
import greetBack from "../../assets/images/greetBack.png";

export const Greeting: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
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

  // const [imageProps] = useSpring(
  //   () => ({
  //     from: { x: 3000, opacity: -5 },
  //     to: { x: 0, opacity: 1 },
  //     delay: 700,
  //   }),
  //   []
  // );

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
                width="350px"
              />
            </animated.div>
          </div>
          {/* <animated.img
            src={greeetingImage}
            alt=""
            style={imageProps}
            className="greeting__inner-image"
          /> */}
        </div>
      </section>
      <Modal active={modalActive} setActive={setModalActive}>
        <div>lorem50</div>
      </Modal>
    </>
  );
};

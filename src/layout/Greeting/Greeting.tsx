import { FC, useState } from "react";
import "./greeting.css";
import { Header } from "../Header/Header";
import { Button } from "../../components/Button/Button";
import { useSpring, animated } from "@react-spring/web";
// import greeetingImage from "../../assets/images/greetingImage.png";
import { Modal } from "../../components/Modal/Modal";

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
        <Header />
        <div className="greeting__inner">
          <div className="greeting__description">
            <animated.h1 style={bigTextProps} className="greeting__text">
              Welcome to FaraPrism English School! Discover your path to English
              language excellence with us. Our dedicated educators and resources
              are here to guide you on your journey. Explore our courses and
              join our vibrant community to speak the language of success. Thank
              you for choosing FaraPrism!
            </animated.h1>
            <animated.div style={smallTextProps} className="greeting__test">
              <p className="greeting__test-text">
                Пройди небольшое тестирование, чтобы узнать свой уровень
              </p>
              <Button
                onClick={() => setModalActive(true)}
                text="Пройти тестирование"
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

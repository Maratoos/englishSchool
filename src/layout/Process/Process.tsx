import { FC } from "react";
import { Typography } from "../../components/Typography/Typography";
import "./process.css";
import { Button } from "../../components/Button/Button";
import { scrollToSection } from "../../hooks/scrollToSection";

type TypeProcessItem = {
  title: string;
  cardItems: Array<string>;
  descriptionItems: Array<string>;
};

const processItems: Array<TypeProcessItem> = [
  {
    title: "Elementary (A1)",
    cardItems: ["500 слов", "1 месяц", "12 занятий"],
    descriptionItems: [
      "Научишься использовать в речи 5 основных времён",
      "Сможешь рассказать о себе, о своей семье, хобби, работе, погоде и досуге",
      "Научишься заказывать еду в ресторане, бронировать номер в отеле по лучшим условиям, спрашивать дорогу заграницей, арендовывать транспорт, ориентироваться в аэропорту и на вокзале",
      "Сможешь говорить о своих чувствах и эмоциях, а также отписывать внешность и одежду любого человека",
    ],
  },
  {
    title: "Pre-intermediate (A2)",
    cardItems: ["1500 слов", "2 месяца", "24 занятия"],
    descriptionItems: [
      "Научишься использовать в речи все 12 времён, а также все модальные глаголы, conditionals, пассивный залог и косвенную речь",
      "Сможешь с легкостью поддержать разговор на темы: тайм-менеджмент, отношения, здоровый образ жизни, проблемы экологии и современного общества",
      "Сможешь провести любую операцию в банке, узнать все детали вашего состояния у доктора, а также решить любую проблему во время путешествия",
    ],
  },
  {
    title: "Intermediate (B1)",
    cardItems: ["2000 слов", "3 месяца", "36 занятий"],
    descriptionItems: [
      "Будешь себя уверенно и комфортно чувствовать при разговоре с иностранцами, а также с лёгкостью использовать все времена и сложные конструкции в речи",
      "Научишься составлять резюме на работу, успешно проходить собеседования, а также вести бизнес-переговоры",
      "Сможешь рассуждать на более глубокие темы, такие как: ментальное здоровье, разница поколений, психология разных стадий жизни, технологии и современное общество, самооценка и боди-позитив",
    ],
  },
  {
    title: "Upper-intermediate (B2)",
    cardItems: ["3000 слов", "1 месяц", "12 занятий"],
    descriptionItems: [
      "Сможешь использовать в речи advanced грамматику, например, complex subject и object, mixed conditionals и narrative fences",
      "Сможешь рассуждать на академические темы, такие как: философия успехов и провалов, эффект FOMO/ JOMO, особенности человеческой памяти, чайлд-фри движение, теории заговоров и другие темы, которые расширят ваш кругозор",
      "После прохождения этого уровня тебе в разы легче будет сдать международные экзамены TOEFL / IELTS / CAE , так как темы очень схожи с экзаменационными",
    ],
  },
];

export const Process: FC = () => {
  return (
    <section id="process" className="process">
      <Typography text="Программа обучения" margin="55px 0 0 0" />
      <div className="process__description">
        {processItems.map((item) => (
          <div key={item.title} className="process__description-item">
            <span className="process__description-item-title">
              {item.title}
            </span>
            <div className="process__description-item-cards">
              {item.cardItems.map((item) => (
                <div key={item} className="process__description-item-card">
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <span className="process__description-item-goal">Goal:</span>
            <div>
              {item.descriptionItems.map((item) => (
                <p key={item} className="process__description-item-desc">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="process__try">
        <Button
          onClick={() =>
            scrollToSection("application")
          }
          backgroundColor="#530fad"
          text="Начать обучение"
          width="249px"
          margin="0 0 0 14px"
        />
        <span className="process__try-text">
          Оставь заявку прямо на сайте, и мы с тобой свяжемся
        </span>
      </div>
    </section>
  );
};

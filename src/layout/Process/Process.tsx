import { FC } from "react";
import { Typography } from "../../components/Typography/Typography";
import "./process.css";
import { Button } from "../../components/Button/Button";
import { scrollToSection } from "../../hooks/scrollToSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDevice } from "../../hooks/UseDevice";

type TypeProcessItem = {
  title: string;
  module?: boolean;
  otherLayout?: boolean;
  cardItems?: Array<string>;
  descriptionItems: Array<string>;
};

const processItems: Array<TypeProcessItem> = [
  {
    title: "Elementary (A1)",
    cardItems: ["+500 слов", "2 месяца", "24 занятия"],
    descriptionItems: [
      "5 основных времён",
      "Сможешь говорить во время путешествий(Заказывать еду, ориентироваться в аэропорту, бронировать отель и многое другое)",
      "Научишься свободно говорить на базовые темы(О себе, семье, погоде, хобби и тд)",
      "Сможешь описывать людей и говорить о чувствах",
    ],
  },
  {
    title: "Pre-intermediate (A2)",
    cardItems: ["+1500 слов", "2,5 месяца", "30 занятия"],
    descriptionItems: [
      "Научишься владеть всеми 12 временами, модальными глаголами, условными предложениями, пассивным залогом и косвенной речью.",
      "Сможешь легко говорить на темы, как отношения, здоровый образ жизни, экологические и социальные вопросы.",
      "Научишься получать подробную информацию у врача и решать любые проблемы во время путешествий",
    ],
  },
  {
    title: "Intermediate (B1)",
    cardItems: ["+2000 слов", "3 месяца", "36 занятий"],
    descriptionItems: [
      "Будешь уверенно общаться с иностранцами, свободно использовать времена и сложные конструкции.",
      "Научишься составлять профессиональные резюме, успешно справляться с собеседованиями и вести деловые переговоры.",
      "Сможешь говорить о глубоких темах, таких как психическое здоровье, технологии и современное общество, развивать уверенность и положительное отношение к своему уровню",
    ],
  },
  {
    title: "Upper-intermediate (B2)",
    cardItems: ["+3000 слов", "3,5 месяца", "40 занятий"],
    descriptionItems: [
      "После окончания этого курса ты сможешь мастерски применять продвинутую грамматику, включая сложные конструкции, смешанные условные предложения и структуры.",
      "Ты сможешь обсуждать академические темы, такие как философия успехов и неудач, особенности человеческой памяти, теории заговоров и другие, что продвинет твой уровень.",
      "А также, ты будешь намного увереннее готовиться к международным экзаменам TOEFL, IELTS, так как курс охватывает темы, близкие к экзаменационным",
    ],
  },
  {
    title: "English for travelers",
    cardItems: ["+2000 слов", "3 месяца", "30 занятий"],
    descriptionItems: [
      "Подготовишься к успешным коммуникациям и навигации на английском во время путешествий",
      "Модули охватывают основы английского, общение, развлечения, безопасность и заканчиваются симуляциями путешествий",
      "Курс разработан для уверенного общения за границей на английском",
    ],
  },
  {
    title: "Business English",
    cardItems: ["+2500 слов", "4 месяца", "40 занятий"],
    module: true,
    descriptionItems: [
      "Основы бизнес-английского: представление, письменная и устная корреспонденция, переговоры.",
      "Общение в деловой среде: собрания, проекты, клиенты, презентации.",
      "Деловые навыки и терминология: управление временем, финансы, маркетинг.",
      "Бизнес-путешествия и международные сделки: организация поездок, международные переговоры, культурные особенности.",
    ],
  },
  {
    title: "Подготовка к успешной сдаче международных экзаменов TOEFL, IELTS",
    otherLayout: true,
    module: true,
    descriptionItems: [
      "Грамматика и лексика",
      "Навыки чтения и аудирования",
      "Навыки письма и разговорной речи",
      "Симуляция экзаменов и практическая подготовка",
    ],
  },
];

export const Process: FC = () => {
  const mobileSwiper = useDevice(1200)
  return (
    <section id="process" className="process">
      <Typography text="Программа обучения" margin="55px 0 0 0" />
      <div className="process__description">
        <Swiper
          className=""
          cssMode={true}
          modules={[Navigation]}
          slidesPerView={mobileSwiper ? 1 : 2}
          navigation
        >
          {processItems.map((item) => (
            <SwiperSlide
              style={{ display: "flex", justifyContent: "center" }}
              key={item.title}
            >
              {item.otherLayout ? (
                <div className="process__description-item">
                  <span className="process__description-item-title other">
                    {item.title}
                  </span>
                  <div className="process__description-item-cards">
                    <div className="process__description-item-card other">
                      <span>
                        Точный период подготовки зависит от уровня студента
                      </span>
                    </div>
                  </div>
                  <span className="process__description-item-goal">
                    {item.module ? "Модули:" : "Goal:"}
                  </span>
                  <div className="process__description-item-descsHolder">
                    {item.descriptionItems.map((item) => (
                      <p key={item} className="process__description-item-desc">
                        * {item}
                      </p>
                    ))}
                  </div>
                  <span className="process__description-item-goal">
                    Завершение курса:
                  </span>
                  <div className="process__description-item-descsHolder">
                    <p className="process__description-item-desc">* Интенсивная подготовка к конкретным экзаменам</p>
                    <p className="process__description-item-desc">* Готовность к успешной сдаче международных экзаменов</p>
                  </div>
                </div>
              ) : (
                <div className="process__description-item">
                  <span className="process__description-item-title">
                    {item.title}
                  </span>
                  <div className="process__description-item-cards">
                    {item.cardItems && item.cardItems.map((item) => (
                      <div
                        key={item}
                        className="process__description-item-card"
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <span className="process__description-item-goal">
                    {item.module ? "Модули:" : "Goal:"}
                  </span>
                  <div className="process__description-item-descsHolder">
                    {item.descriptionItems.map((item) => (
                      <p key={item} className="process__description-item-desc">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="process__try">
        <Button
          onClick={() => scrollToSection("application")}
          backgroundColor="#530fad"
          text="Начать обучение"
          width="300px"
        />
        <span className="process__try-text">
          Оставь заявку прямо на сайте, и мы с тобой свяжемся
        </span>
      </div>
    </section>
  );
};

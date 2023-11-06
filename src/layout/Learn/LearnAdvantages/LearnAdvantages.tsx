import { FC } from "react";
import "../learn.css";
import { AdvantageCard } from "../../../components/AdvantageCard/AdvantageCard";
import gobbler from "../../../assets/icons/gobbler.svg";
import matrix from "../../../assets/icons/matrix.svg";
import computer from "../../../assets/icons/computer.svg";
import schedule from "../../../assets/icons/schedule.svg";
import dialog from "../../../assets/icons/dialog.svg";
import { Typography } from "../../../components/Typography/Typography";

type TypeCardItem = {
  image: string;
  title: string;
  description: string;
};

const AdvantageCardItems: Array<TypeCardItem> = [
  {
    image: gobbler,
    title: "Огромное количество практики",
    description:
      "Большое количество самостоятельных заданий и примеров из реальной жизни",
  },
  {
    image: matrix,
    title: "Современные методики обучения",
    description:
      "Спиральное обучение: погружаемся в материал постепенно, виток за витком",
  },
  {
    image: computer,
    title: "Простое и понятное объяснение",
    description: "Вместо заумных терминов примеры из реального мира",
  },
  {
    image: schedule,
    title: "Гибкий график занятий",
    description: "Выбери подходящее для тебя время и обучайся по нему",
  },
  {
    image: dialog,
    title: "Прямая связь с куратором",
    description: "Задавай вопросы на интересующие темы своему куратору",
  }
];

export const LearnAdvantages: FC = () => {
  return (
    <div className="learn__advantages">
      <Typography text="Учись с нами удобно и результативно" width="600px" />
      <div className="learn__advantages-cards">
        {AdvantageCardItems.map((item) => (
          <AdvantageCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

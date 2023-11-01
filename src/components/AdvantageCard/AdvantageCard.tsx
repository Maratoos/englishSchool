import { FC } from "react";
import "./index.css";

interface Props {
  item: {
    image: string;
    title: string;
    description: string;
  };
}

export const AdvantageCard: FC<Props> = ({ item }) => {
  return (
    <div className="advantageCard">
      <img className="advantageCard-image" src={item.image} alt="" />
      <h4 className="advantageCard-title">{item.title}</h4>
      <p className="advantageCard-description">{item.description}</p>
    </div>
  );
};

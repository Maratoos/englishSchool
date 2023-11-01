import { FC } from "react";
import { LearnSubjects } from "./LearnSubjects/LearnSubjects";
import { LearnAdvantages } from "./LearnAdvantages/LearnAdvantages";
import "./learn.css";

export const Learn: FC = () => {

  return (
    <section id="learn" className="learn">
      <LearnSubjects />
      <LearnAdvantages />
    </section>
  );
};

import { FC } from "react";
import { Greeting } from "../../layout/Greeting/Greeting";
import { Learn } from "../../layout/Learn/Learn";
import { Process } from "../../layout/Process/Process";
import { ProcessBottom } from "../../layout/Process/ProcessBottom/ProcessBottom";
import { Reviews } from "../../layout/Reviews/Reviews";
import { ApplicationForm } from "../../layout/ApplicationForm/ApplicationForm";

export const Home: FC = () => {
  return (
    <>
      <Greeting />
      <Learn />
      <Process />
      <ProcessBottom />
      <Reviews />
      <ApplicationForm />
    </>
  );
};

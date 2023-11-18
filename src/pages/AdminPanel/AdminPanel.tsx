import { FC } from "react";
import { Applications } from "../../layout/AdminPanel/Applications/Applications";
import "./adminPanel.css";
import { ConfirmedReviews } from "../../layout/AdminPanel/Reviews/ConfirmedReviews/ConfirmedReviews";

export const AdminPanel: FC = () => {
  return (
    <section className="adminPanel">
      <Applications />
      <ConfirmedReviews />
    </section>
  );
};

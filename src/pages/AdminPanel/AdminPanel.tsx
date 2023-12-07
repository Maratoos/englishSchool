import { FC } from "react";
import { Applications } from "../../layout/AdminPanel/Applications/Applications";
import "./adminPanel.css";
import { ConfirmedReviews } from "../../layout/AdminPanel/Reviews/ConfirmedReviews/ConfirmedReviews";
import { ReceivedReviews } from "../../layout/AdminPanel/Reviews/RecievedReviews/RecievedReviews";
import { useDevice } from "../../hooks/UseDevice";
import { Typography } from "../../components/Typography/Typography";

export const AdminPanel: FC = () => {
  const mobile = useDevice(1024);

  return (
    <section className="adminPanel">
      {mobile ? (
        <Typography text="Зайдите через компьютер!" />
      ) : (
        <>
          <Applications />
          <ConfirmedReviews />
          <ReceivedReviews />
        </>
      )}
    </section>
  );
};

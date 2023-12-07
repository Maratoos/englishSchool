import { FC, useState, ChangeEvent, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./reviews.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Typography } from "../../components/Typography/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { useCollection } from "../../hooks/useColection";
import { IReview } from "../../models/models";
import { CircularProgress } from "@mui/material";
import { getCollection } from "../../hooks/getCollection";
import { useDevice } from "../../hooks/UseDevice";

interface IlettersCounter {
  name: number;
  instName: number;
  review: number;
}

const initialLettersCounter: IlettersCounter = {
  name: 0,
  instName: 0,
  review: 0,
};

const initialModalInfo: Omit<IReview, "id" | "createdAt"> = {
  name: "",
  instName: "",
  review: "",
};

export const Reviews: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lettersCounter, setLettersCounter] = useState(initialLettersCounter);
  const [modalInfo, setModalInfo] = useState(initialModalInfo);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mobile = useDevice(750);
  const { addDocument } = useCollection("recievedReviews");
  const { documents, isPending } = getCollection<IReview>("confirmedReviews");
  const savedIsReviewAlreadyAdded = localStorage.getItem(
    "isReviewAlreadyAdded"
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setModalInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLettersCounter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.length,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    await addDocument<IReview>(modalInfo);
    localStorage.setItem("isReviewAlreadyAdded", JSON.stringify(true));
    formRef.current?.reset();
    setLettersCounter(initialLettersCounter);
    setModalInfo(initialModalInfo);
    setIsLoading(false);
    setModalActive(false);
  };

  return (
    <>
      <section id="reviews" className="reviews">
        <Typography text="Отзывы учеников:" />
        <div className="reviews__swiperHolder">
          <Swiper
            className="reviews__mainSwiper"
            cssMode={true}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {documents.length > 0 &&
              !isPending &&
              documents.map((review) => (
                <SwiperSlide
                  key={review.instName}
                  className="reviews__mainSwiper-item"
                >
                  <div className="item__container">
                    <div className="item__innerContainer">
                      <div className="item__userData">
                        <div>
                          <PersonIcon
                            sx={{ margin: "0 5px -5px 0", color: "#FFFFFF" }}
                          />
                          <span className="item__name">{review.name} </span>
                        </div>
                        <pre> </pre>
                        {review.instName ? (
                          <div>
                            <InstagramIcon
                              sx={{ margin: "0 5px -5px 0", color: "#FFFFFF" }}
                            />
                            <span className="item__inst">
                              {review.instName}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <p className="item__text">{review.review}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Button
          text="Оставьте отзыв"
          backgroundColor="#8243d6"
          margin="20px 0 0 0"
          width="250px"
          onClick={() => setModalActive(true)}
        />
      </section>
      <Modal
        width={mobile ? "70vw" : ""}
        active={modalActive}
        setActive={setModalActive}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="reviewForm">
          <div>
            <input
              required
              type="text"
              className="reviewInput"
              placeholder="Имя"
              onChange={handleChange}
              autoComplete="Name"
              name="name"
              maxLength={30}
            />
            <p className="counter">{`${lettersCounter.name}/30`}</p>
          </div>
          <div>
            <input
              required
              type="text"
              className="reviewInput"
              placeholder="Instagram"
              onChange={handleChange}
              autoComplete="instagram"
              name="instName"
              maxLength={30}
              style={{ marginTop: "10px" }}
            />
            <p className="counter">{`${lettersCounter.instName}/30`}</p>
          </div>
          <div>
            <textarea
              required
              id="textArea"
              className="reviewInput"
              placeholder="Твой отзыв"
              onChange={handleChange}
              name="review"
              maxLength={300}
              style={{ height: "100px", marginTop: "40px" }}
            ></textarea>
            <p className="counter">{`${lettersCounter.review}/300`}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {!isLoading ? (
              <Button
                margin="20px 0"
                width="200px"
                type="submit"
                disabled={!!savedIsReviewAlreadyAdded}
                text={`${
                  !!savedIsReviewAlreadyAdded ? "Отзыв оставлен" : "Подтвердить"
                }`}
                backgroundColor="#8243d6"
              />
            ) : (
              <CircularProgress size={60} sx={{ marginTop: 2 }} color="secondary" />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

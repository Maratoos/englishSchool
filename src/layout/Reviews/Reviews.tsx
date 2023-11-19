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

export const Reviews: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lettersCounter, setLettersCounter] = useState<number>(0);
  const [modalInfo, setModalInfo] = useState<Omit<IReview, "id" | "createdAt">>(
    {
      name: "",
      instName: "",
      review: "",
    }
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const mobile = useDevice(750);
  const { addDocument } = useCollection("recievedReviews");
  const { documents, isPending } = getCollection<IReview>("confirmedReviews");
  const savedIsReviewAlreadyAdded = localStorage.getItem(
    "isReviewAlreadyAdded"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setModalInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<undefined | void> => {
    e.preventDefault();
    if (!!savedIsReviewAlreadyAdded) {
      return;
    } else {
      setIsLoading(true);
      await addDocument<IReview>(modalInfo);
      localStorage.setItem("isReviewAlreadyAdded", JSON.stringify(true));
      formRef.current?.reset();
      setLettersCounter(0)
      setIsLoading(false);
      setModalActive(false);
    }
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
          <input
            required
            type="text"
            className="reviewInput"
            placeholder="Instagram"
            onChange={handleChange}
            autoComplete="instagram"
            name="instName"
            maxLength={30}
          />
          <textarea
            required
            id="textArea"
            className="reviewInput"
            placeholder="Твой отзыв"
            onChange={(e) => {
              handleChange(e);
              setLettersCounter(e.target.value.length);
            }}
            name="review"
            maxLength={300}
          ></textarea>
          <p className="counter">{`${lettersCounter}/300`}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              margin="20px 0"
              width="200px"
              type="submit"
              text={`${
                !!savedIsReviewAlreadyAdded
                  ? "Отзыв оставлен"
                  : "Подтвердить"
              }`}
              backgroundColor="#8243d6"
            />
            {isLoading && <CircularProgress size={60} sx={{ marginLeft: 4 }} />}
          </div>
        </form>
      </Modal>
    </>
  );
};

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
  const { addDocument } = useCollection("recievedReviews");
  const { documents, isPending } = getCollection<IReview>("confirmedReviews");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setModalInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await addDocument<IReview>(modalInfo);
    formRef.current?.reset();
    setIsLoading(false);
    setTimeout(() => {
      setModalActive(false);
    }, 2000);
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
                      <p className="item__text">{review.review}</p>
                      <div className="item__userData">
                        <PersonIcon
                          sx={{ margin: "0 5px -5px 0", color: "#FFFFFF" }}
                        />
                        <span className="item__name">{review.name}, </span>
                        <InstagramIcon
                          sx={{ margin: "0 5px -5px 0", color: "#FFFFFF" }}
                        />
                        <span className="item__inst">{review.instName}</span>
                      </div>
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
      <Modal active={modalActive} setActive={setModalActive}>
        <form ref={formRef} onSubmit={handleSubmit} className="reviewForm">
          <input
            required
            type="text"
            className="reviewInput"
            placeholder="Имя"
            onChange={handleChange}
            autoComplete="Name"
            name="name"
          />
          <input
            required
            type="text"
            className="reviewInput"
            placeholder="Instagram"
            onChange={handleChange}
            autoComplete="instagram"
            name="instName"
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
              text="Подтвердить"
              backgroundColor="#8243d6"
            />
            {isLoading && <CircularProgress size={60} sx={{ marginLeft: 4 }} />}
          </div>
        </form>
      </Modal>
    </>
  );
};

import { FC, useState } from "react";
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

interface IReviewsItems {
  name: string;
  inst: string;
  review: string;
}

const reviewsItems: Array<IReviewsItems> = [
  {
    name: "Marat",
    inst: "rareitemboy",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum aliquam odio commodi officiis sequi, tenetur sint omnis minus fugiat esse repellendus minima neque veritatis! Quam architecto voluptatem odit earum!",
  },
  {
    name: "Marat",
    inst: "rareitemboy1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum aliquam odio commodi officiis sequi, tenetur sint omnis minus fugiat esse repellendus minima neque veritatis! Quam architecto voluptatem odit earum!",
  },
  {
    name: "Marat",
    inst: "rareitemboy2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum aliquam odio commodi officiis sequi, tenetur sint omnis minus fugiat esse repellendus minima neque veritatis! Quam architecto voluptatem odit earum!",
  },
  {
    name: "Marat",
    inst: "rareitemboy3",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum aliquam odio commodi officiis sequi, tenetur sint omnis minus fugiat esse repellendus minima neque veritatis! Quam architecto voluptatem odit earum!",
  },
];

export const Reviews: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  //225 символов
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
            {reviewsItems.map((review) => (
              <SwiperSlide
                key={review.inst}
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
                      <span className="item__inst">{review.inst}</span>
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
      <input type="text" />
      <input type="text" />
      <input type="text" />
      </Modal>
    </>
  );
};

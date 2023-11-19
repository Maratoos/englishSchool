import React, { ChangeEvent, FC, useState, useRef } from "react";
import "./applicationForm.css";
import { IApplication } from "../../models/models";
import { useCollection } from "../../hooks/useColection";
import { getCookie } from "../../hooks/getCookie";

export const ApplicationForm: FC = () => {
  const [application, setApplication] = useState<Omit<IApplication, "id" | "createdAt" | "currentLevel" | "correctAnswers">>({
    name: "",
    email: "",
    country: "",
    whatsAppNumber: "",
    checked: false,
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { addDocument } = useCollection("applications");
  const savedIsApplicaionAlreadyAdded = localStorage.getItem(
    "savedIsApplicaionAlreadyAdded"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setApplication((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitt = async (e: React.FormEvent<HTMLFormElement>): Promise<void | undefined> => {
    e.preventDefault();
    if(!!savedIsApplicaionAlreadyAdded) {
      return 
    }

    const dataFromCookie = {
      currentLevel: getCookie("currentLevel") || null,
      correctAnswers: Number(getCookie("correctAnswers")) || null,
    };

    setButtonIsDisabled(true);
    await addDocument<IApplication>({...application, ...dataFromCookie} as IApplication);
    localStorage.setItem("savedIsApplicaionAlreadyAdded", JSON.stringify(true));
    formRef.current?.reset();
    setButtonIsDisabled(false);
  };

  return (
    <section className="application" id="application">
      <div className="container">
        <div className="text">Форма заявки</div>
        <form ref={formRef} onSubmit={handleSubmitt}>
          <div className="form-row">
            <div className="input-data">
              <input
                onChange={handleChange}
                autoComplete="name"
                name="name"
                type="text"
                required
                maxLength={30}
              />
              <div className="underline"></div>
              <label>Имя</label>
            </div>
            <div className="input-data">
              <input
                onChange={handleChange}
                autoComplete="country"
                name="country"
                type="text"
                required
                maxLength={50}
              />
              <div className="underline"></div>
              <label>Страна</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                onChange={handleChange}
                autoComplete="email"
                name="email"
                type="email"
                required
                maxLength={70}
              />
              <div className="underline"></div>
              <label>Email</label>
            </div>
            <div className="input-data">
              <input
                onChange={handleChange}
                autoComplete="tel"
                name="whatsAppNumber"
                type="text"
                required
                maxLength={70}
              />
              <div className="underline"></div>
              <label>Номер WhatsApp(в межд. форматe +996)</label>
            </div>
          </div>
          <button
            type="submit"
            disabled={buttonIsDisabled}
            className="submit-btn"
          >
            {!!savedIsApplicaionAlreadyAdded ? "Заявка отправлена" : "Подтвердить"}
          </button>
        </form>
      </div>
    </section>
  );
};

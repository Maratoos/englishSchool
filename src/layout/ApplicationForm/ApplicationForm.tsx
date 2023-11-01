import React, { ChangeEvent, FC, useState, useRef } from "react";
import "./applicationForm.css";
import { IApplication } from "../../models/models";
import { useCollection } from "../../hooks/useColection";

export const ApplicationForm: FC = () => {
  const [application, setApplication] = useState<Omit<IApplication, "id" | "createdAt">>({
    name: "",
    email: "",
    country: "",
    whatsAppNumber: "",
    checked: false,
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { addDocument } = useCollection("applications");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApplication((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Я сработал");
    setButtonIsDisabled(true);
    await addDocument(application);
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
            Подтвердить
          </button>
        </form>
      </div>
    </section>
  );
};

{
  /* <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input
                disabled={buttonIsDisabled}
                type="submit"
                value="Подтвердить"
              />
            </div>
          </div> */
}

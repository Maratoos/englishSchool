import { FC } from "react";
import "./header.css";
import { scrollToSection } from "../../hooks/scrollToSection";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

const navbarItems: Array<{ text: string; section: string }> = [
  {
    text: "Чему ты научишься",
    section: "learn",
  },
  {
    text: "Программа обучения",
    section: "process",
  },
  {
    text: "Отзывы",
    section: "reviews",
  },
  {
    text: "Заполнить заявку",
    section: "application",
  },
  {
    text: "Контакты",
    section: "contacts",
  },
];

export const Header: FC = () => {
  return (
    <header className="header__outer">
      <div className="header__inner">
        <div className="logo" onClick={() => scrollToSection("greeting")}>
          <span className="logo__text-top">Fara</span>
          <span className="logo__text-bottom">Prism</span>
        </div>
        <nav className="navbar">
          <ul className="navbar__items">
            {navbarItems.map((item) => (
              <li
                className="navbar__items-link"
                onClick={() => scrollToSection(item.section)}
                key={item.section}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </nav>
        <BurgerMenu navbarItems={navbarItems} />
      </div>
    </header>
  );
};

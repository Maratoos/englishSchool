import { FC, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";
import headerButton from "../../assets/icons/headerButton.svg";
import { scrollToSection } from "../../hooks/scrollToSection";

interface Props {
  navbarItems: Array<{ text: string; section: string }>;
}

export const BurgerMenu: FC<Props> = ({ navbarItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (section: string): void => {
    setAnchorEl(null);
    scrollToSection(section);
  };

  const styles = {
    color: "#22253b",
    fontFamily: "Gilroy",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "100%",
    margin: "10px 0",
  };

  return (
    <div>
      <div
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="header__menuBtn"
      >
        <img src={headerButton} alt="" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {navbarItems.map((item) => (
          <MenuItem
            sx={styles}
            key={item.section}
            onClick={() => handleClose(item.section)}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

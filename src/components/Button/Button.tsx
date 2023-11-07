import React, { FC } from "react";
import { styled } from "@mui/material";
import MButton from '@mui/material/Button';

interface CustomProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  margin?: string;
  backgroundColor?: string;
  width?: string
}

const CustomButton = styled(MButton)({
  width: "321px",
  height: "70px",
  borderRadius: "82px",
  background: "#2e16b1",
  outline: "none",
  border: "none",
  cursor: "pointer",

  color: "#FFFFFF",
  fontFamily: "Gilroy",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "96.688%",
  letterSpacing: "-0.6px",
});

export const Button: FC<CustomProps> = ({ text, onClick, margin, width, backgroundColor = "#2e16b1", type }) => {
  return (
    <CustomButton type={type} style={{ margin, width, backgroundColor }} onClick={onClick}>
      {text}
    </CustomButton>
  );
};

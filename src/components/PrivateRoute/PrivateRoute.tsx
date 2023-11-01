import React, { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Typography } from "../Typography/Typography";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { user } = useAppSelector((auth) => auth.auth);
  return <>{user ? children : <Typography text="Такой страницы нет, 404" />}</>;
};

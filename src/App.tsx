import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useAppDispatch } from "./hooks/redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { setUser } from "./store/reducers/AuthSlice";
import { Layout } from "./layout/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import { Auth } from "./pages/Auth/Auth";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useLocation } from "react-router-dom";
import { Header } from "./layout/Header/Header";
import { setDefaultValues } from "./store/reducers/QuizSlice";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        dispatch(setUser(_user));
      }
      dispatch(setDefaultValues());
    });

    return () => unsub();
  }, []);

  return (
    <>
      {location.pathname !== "/admin" && location.pathname !== "/auth" && (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
};

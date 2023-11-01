import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type TypeInitialState = {
  user: User | null,
  isUserLoading: boolean
}

const initialState: TypeInitialState = {
  user: null,
  isUserLoading: true
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.isUserLoading = action.payload
    }
  },
});

export default authSlice.reducer;
export const { setUser, setUserLoading } = authSlice.actions

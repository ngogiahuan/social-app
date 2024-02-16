import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { UserType } from "@/types/userType";

interface LoginUserState {
  user: UserType | null;
  token: string | null;
}

const initialState: LoginUserState = {
  user: null,
  token: null,
};

export const LoginUserStateSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem("token", state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = LoginUserStateSlice.actions;
export const selectUser = (state: RootState) => state.loginUser.user;
export default LoginUserStateSlice.reducer;

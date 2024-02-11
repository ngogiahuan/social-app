import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

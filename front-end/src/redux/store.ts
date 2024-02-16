import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feature/counter";
import loginUserReducer from "./feature/loginUser/loginUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginUser: loginUserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

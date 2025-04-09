import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import urlReducer from "./slices/urlSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
    urls: urlReducer, // Add the URL slice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
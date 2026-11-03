import { configureStore } from "@reduxjs/toolkit;
import { userApi } from "../api/UserApi";
  
import { postApi } from "../api/postApi";
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      userApi.middleware
    ),
  
  
});

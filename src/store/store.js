import { configureStore } from "@reduxjs/toolkit";
import { animeSlice } from "./anime/anime-slice";
import { authSlice } from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: animeSlice.reducer,
  },
});

export default store;

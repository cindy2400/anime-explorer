import { configureStore } from "@reduxjs/toolkit";
import { animeSlice } from "./anime/anime-slice";

const store = configureStore({
  reducer: {
    anime: animeSlice.reducer,
  },
});

export default store;

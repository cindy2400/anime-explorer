import { configureStore } from "@reduxjs/toolkit";
import { animeSlice } from "./anime/anime-slice";

const store = configureStore({
  reducer: {
    home: animeSlice.reducer,
  },
});

export default store;

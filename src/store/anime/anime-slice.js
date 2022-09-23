import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    getTrendingAnime(state, action) {
      console.log(action.payload.Page.media);
      state.animes = action.payload.Page.media;
    },
  },
});

export const animeActions = animeSlice.actions;

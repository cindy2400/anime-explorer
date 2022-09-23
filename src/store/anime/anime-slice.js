import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
  anime: {},
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    getTrendingAnime(state, action) {
      state.animes = action.payload.Page.media;
    },
    getDetailAnime(state, action) {
      state.anime = action.payload.Media;
    },
  },
});

export const animeActions = animeSlice.actions;

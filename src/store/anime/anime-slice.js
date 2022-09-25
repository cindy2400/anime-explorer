import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
  anime: {},
  animeFavorites: [],
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    getTrendingAnime(state, action) {
      state.animes = action.payload.Page.media;
    },
    getPopularAnime(state, action) {
      state.animes = action.payload.Page.media;
    },
    getUpcomingAnime(state, action) {
      state.animes = action.payload.Page.media;
    },
    getDetailAnime(state, action) {
      state.anime = action.payload.Media;
    },
    addFavoriteAnime(state, action) {
      state.animeFavorites.push(action.payload);
    },
    removeFavoriteAnime(state, action) {
      state.animeFavorites = state.animeFavorites.filter(
        (anime) => anime.id !== action.payload
      );
    },
  },
});

export const animeActions = animeSlice.actions;

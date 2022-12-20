import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
  anime: {},
  animeFavorites: [],
  pageInfo: {},
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    getTrendingAnime(state, action) {
      const page = action.payload.Page.pageInfo.currentPage;
      if (page === 1) {
        state.animes = [];
        state.animes = action.payload.Page.media;
      } else {
        state.animes = [...state.animes, ...action.payload.Page.media];
      }
      state.pageInfo = action.payload.Page.pageInfo;
    },
    getPopularAnime(state, action) {
      state.animes.push(...action.payload.Page.media);
    },
    getUpcomingAnime(state, action) {
      state.animes.push(...action.payload.Page.media);
    },
    removeAnime(state) {
      state.animes = [];
    },
    getDetailAnime(state, action) {
      state.anime = action.payload.Media;
    },
    removeDetailAnime(state) {
      state.anime = {};
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

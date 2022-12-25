import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
  anime: {},
  animeCharacter: {},
  animeFavorites: [],
  pageInfo: {},
  animeTrendingPreview: [],
  animePopularPreview: [],
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    getTrendingAnime(state, action) {
      const page = action.payload.Page.pageInfo.currentPage;
      if (page === 1) {
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
    setAnimeTrendingPreview(state, action) {
      state.animeTrendingPreview = action.payload.Page.media;
    },
    setAnimePopularPreview(state, action) {
      state.animePopularPreview = action.payload.Page.media;
    },
    setDetailCharacter(state, action) {
      state.animeCharacter = action.payload.Character;
    },
  },
});

export const animeActions = animeSlice.actions;

import { client } from "../../util/apollo";
import {
  GET_DETAIL_ANIME,
  GET_POPULAR_ANIME,
  GET_SEARCH_ANIME,
  GET_TRENDING_ANIME,
  GET_UPCOMING_ANIME,
} from "./anime-query";
import { animeActions } from "./anime-slice";

export const fetchTrendingAnime = (searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: searchQuery === "" ? GET_TRENDING_ANIME : GET_SEARCH_ANIME,
        variables: {
          page: 1,
          perPage: 20,
          search: searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
        },
      })
      .then((response) =>
        dispatch(animeActions.getTrendingAnime(response.data))
      )
      .catch((err) => console.error(err));
  };
};

export const fetchPopularAnime = (searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: searchQuery === "" ? GET_POPULAR_ANIME : GET_SEARCH_ANIME,
        variables: {
          page: 1,
          perPage: 20,
          search: searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
        },
      })
      .then((response) => dispatch(animeActions.getPopularAnime(response.data)))
      .catch((err) => console.error(err));
  };
};

export const fetchUpcomingAnime = (searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: searchQuery === "" ? GET_UPCOMING_ANIME : GET_SEARCH_ANIME,
        variables: {
          page: 1,
          perPage: 20,
          search: searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
        },
      })
      .then((response) =>
        dispatch(animeActions.getUpcomingAnime(response.data))
      )
      .catch((err) => console.error(err));
  };
};

export const fetchDetailAnime = (id) => {
  return (dispatch) => {
    client
      .query({
        query: GET_DETAIL_ANIME,
        variables: {
          id: id,
        },
      })
      .then((response) => dispatch(animeActions.getDetailAnime(response.data)))
      .catch((err) => console.log(err));
  };
};

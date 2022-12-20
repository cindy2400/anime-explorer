import { client } from "../../util/apollo";
import { GET_ANIME, GET_DETAIL_ANIME } from "./anime-query";
import { animeActions } from "./anime-slice";

export const fetchTrendingAnime = (page = 1, searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: GET_ANIME,
        variables: {
          page: page,
          perPage: 10,
          search: searchQuery === "" ? undefined : searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
          sort: "TRENDING_DESC",
        },
      })
      .then((response) =>
        dispatch(animeActions.getTrendingAnime(response.data))
      )
      .catch((err) => console.error(err));
  };
};

export const fetchPopularAnime = (page = 1, searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: GET_ANIME,
        variables: {
          page: page,
          perPage: 20,
          search: searchQuery === "" ? undefined : searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
          sort: "POPULARITY_DESC",
        },
      })
      .then((response) => dispatch(animeActions.getPopularAnime(response.data)))
      .catch((err) => console.error(err));
  };
};

export const fetchUpcomingAnime = (page = 1, searchQuery, filterSeason) => {
  return (dispatch) => {
    client
      .query({
        query: GET_ANIME,
        variables: {
          page: page,
          perPage: 20,
          search: searchQuery === "" ? undefined : searchQuery,
          season: filterSeason === "all" ? undefined : filterSeason,
          sort: "START_DATE_DESC",
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

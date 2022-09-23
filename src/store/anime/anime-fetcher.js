import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ANIME } from "./anime-query";
import { animeActions } from "./anime-slice";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

export const fetchAnime = () => {
  return (dispatch) => {
    client
      .query({
        query: GET_ANIME,
        variables: {
          page: 1,
          perPage: 20,
        },
      })
      .then((response) =>
        dispatch(animeActions.getTrendingAnime(response.data))
      )
      .catch((err) => console.error(err));
  };
};
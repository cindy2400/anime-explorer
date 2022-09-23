import { gql } from "@apollo/client";

export const GET_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          color
        }
        type
        genres
      }
    }
  }
`;

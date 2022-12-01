import { gql } from "@apollo/client";

export const GET_ANIME = gql`
  query (
    $page: Int
    $perPage: Int
    $season: MediaSeason
    $search: String
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
      }
      media(type: ANIME, sort: $sort, season: $season, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        season
        seasonYear
        coverImage {
          large
          color
        }
      }
    }
  }
`;

export const GET_DETAIL_ANIME = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
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
      season
      seasonYear
      bannerImage
      trailer {
        id
      }
      status
      genres
      description
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_ANIME = gql`
  query (
    $page: Int
    $perPage: Int
    $season: MediaSeason
    $search: String
    $genre: String
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
      }
      media(
        type: ANIME
        sort: $sort
        season: $season
        search: $search
        genre: $genre
      ) {
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
      episodes
      format
      duration
      averageScore
      source
      characters(sort: FAVOURITES_DESC, perPage: 6) {
        nodes {
          id
          name {
            first
            middle
            last
            full
            native
            userPreferred
          }
          image {
            large
            medium
          }
          gender
        }
      }
      staff(sort: FAVOURITES_DESC, perPage: 4) {
        nodes {
          id
          name {
            first
            middle
            last
            full
            native
            userPreferred
          }
          image {
            large
            medium
          }
          primaryOccupations
        }
      }
    }
  }
`;

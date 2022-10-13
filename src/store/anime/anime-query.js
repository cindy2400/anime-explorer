import { gql } from "@apollo/client";

export const GET_TRENDING_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
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

export const GET_POPULAR_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
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

export const GET_UPCOMING_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(type: ANIME, sort: START_DATE_DESC) {
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

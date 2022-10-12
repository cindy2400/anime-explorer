import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailAnime } from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import { isEmpty } from "../util/helper";
import styles from "./DetailAnime.module.css";
import Card from "./ui/Card";

const DetailAnime = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const animeDetail = useSelector((state) => state.home.anime);
  const favAnime = useSelector((state) => state.home.animeFavorites);
  const animeId = param.animeId;
  const isFavoriteAnime = useMemo(
    () => favAnime.some((fav) => +fav.id === +animeId),
    [animeId, favAnime]
  );

  useEffect(() => {
    dispatch(fetchDetailAnime(animeId));
  }, [dispatch, animeId]);

  const favoriteAnimeHandler = (animeFav) => {
    dispatch(animeActions.addFavoriteAnime(animeFav));
  };

  const removeFavoriteAnimeHandler = (id) => {
    dispatch(animeActions.removeFavoriteAnime(id));
  };

  if (isEmpty(animeDetail)) {
    return <p>Loading</p>;
  }
  return (
    <Card>
      <h1>{animeDetail.title.english || animeDetail.title.romaji}</h1>
      <div className={styles.container}>
        <img
          className={styles["container-image"]}
          src={animeDetail.coverImage.large}
          alt="anime cover"
        />
        <div className={styles["container-property"]}>
          {animeDetail.genres.map((genre) => (
            <h6 key={genre}>{genre}</h6>
          ))}
          <p>{animeDetail.description}</p>
          <button
            onClick={() =>
              isFavoriteAnime
                ? removeFavoriteAnimeHandler(animeDetail.id)
                : favoriteAnimeHandler(animeDetail)
            }
            className={
              isFavoriteAnime
                ? styles["button-remove"]
                : styles["button-favorite"]
            }
          >
            {isFavoriteAnime ? "Remove" : "Favorite"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DetailAnime;

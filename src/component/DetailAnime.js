import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailAnime } from "../store/anime/anime-fetcher";
import { isEmpty } from "../util/helper";
import styles from "./DetailAnime.module.css";
import Card from "./ui/Card";

const DetailAnime = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const animeDetail = useSelector((state) => state.home.anime);

  const animeId = param.animeId;

  useEffect(() => {
    dispatch(fetchDetailAnime(animeId));
  }, [dispatch, animeId]);

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
        </div>
      </div>
    </Card>
  );
};

export default DetailAnime;

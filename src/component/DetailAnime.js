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
  const animeDetail = useSelector((state) => state.anime.anime);
  const favAnime = useSelector((state) => state.anime.animeFavorites);
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
    return <p>Loading...</p>;
  }
  return (
    <Card>
      {animeDetail.bannerImage && (
        <img
          className={styles["container-banner"]}
          src={animeDetail.bannerImage}
          alt="anime banner"
        />
      )}
      <div className={styles.container}>
        <div className={styles["container-column"]}>
          <img
            className={styles["container-image"]}
            src={animeDetail.coverImage.large}
            alt="anime cover"
          />
          <Card className={styles["container-info"]}>
            <h3>Season</h3>
            <p className={styles.paragraph}>{animeDetail.season}</p>
            <h3>Status</h3>
            <p className={styles.paragraph}>{animeDetail.status}</p>
            <h3>Episodes</h3>
            <p className={styles.paragraph}>{animeDetail.episodes}</p>
            <h3>Format</h3>
            <p className={styles.paragraph}>{animeDetail.format}</p>
            <h3>Duration</h3>
            <p className={styles.paragraph}>{animeDetail.duration}</p>
            <h3>Average score</h3>
            <p className={styles.paragraph}>{animeDetail.averageScore}</p>
            <h3>Source</h3>
            <p className={styles.paragraph}>{animeDetail.source}</p>
            <h3>Genre</h3>
            {animeDetail.genres.map((genre) => (
              <p className={styles.paragraph} key={genre}>
                {genre}
              </p>
            ))}
          </Card>
        </div>

        <div className={styles["container-property"]}>
          <Card>
            <h2>{animeDetail.title.english || animeDetail.title.romaji}</h2>
            <p
              className={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: animeDetail.description }}
            ></p>
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

            <hr></hr>
            <h3>Characters</h3>
            <div className={styles["container-characters"]}>
              {animeDetail.characters.nodes.map((char) => (
                <Card key={char.id} className={styles["card-character-row"]}>
                  <img
                    src={char.image.medium}
                    alt="character"
                    className={styles["character-image"]}
                  />
                  <div className={styles["card-character-col"]}>
                    <p className={styles["character-p"]}>{char.name.full}</p>
                    <p className={styles["character-p"]}>{char.gender}</p>
                  </div>
                </Card>
              ))}
            </div>

            <hr></hr>
            <h3>Staff</h3>
            <div className={styles["container-characters"]}>
              {animeDetail.staff.nodes.map((staff) => (
                <Card className={styles["card-character-row"]}>
                  <img
                    src={staff.image.medium}
                    alt="character"
                    className={styles["character-image"]}
                  />
                  <div className={styles["card-character-col"]}>
                    <p className={styles["character-p"]}>{staff.name.full}</p>
                    <p className={styles["character-p"]}>
                      {staff.primaryOccupations[0]}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <hr></hr>
            <h3>Trailer</h3>
            {animeDetail.trailer !== null && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${animeDetail.trailer.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="1"
              ></iframe>
            )}
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default DetailAnime;

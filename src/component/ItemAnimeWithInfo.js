import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { animeActions } from "../store/anime/anime-slice";
import { ellipsisTitle } from "../util/helper";
import styles from "./ItemAnimeWithInfo.module.css";
import Badge from "./ui/Badge";

const ItemAnimeWithInfo = React.forwardRef(({ anime }, ref) => {
  const dispatch = useDispatch();

  const renewDetailHandler = () => {
    dispatch(animeActions.removeDetailAnime());
  };

  const animeItem = (
    <Link
      key={anime.id}
      to={`/anime/${anime.id}`}
      onClick={renewDetailHandler}
      className={styles.link}
    >
      <div className={styles["item-info-row"]}>
        <div className={styles["image-section"]}>
          <img
            alt="anime poster"
            className={styles["item-poster"]}
            src={anime?.coverImage?.large}
          />
        </div>
        <div className={styles["item-info-col"]}>
          <div className={styles["info-section"]}>
            <h3 className={styles.title}>
              {ellipsisTitle(anime?.title?.english || "") ||
                ellipsisTitle(anime?.title?.romaji || "")}
            </h3>
            <p className={styles[`${anime?.season}`]}>
              {anime.season ? anime.season + " " + anime.seasonYear : "-"}
            </p>
            <p
              className={styles.detail}
              dangerouslySetInnerHTML={{ __html: anime.description }}
            ></p>
          </div>
          <div className={styles["genre-section"]}>
            {anime.genres[0] ? (
              <Badge class={styles[`${anime?.season}-bg`]}>
                {anime.genres[0]}
              </Badge>
            ) : (
              ""
            )}
            {anime.genres[1] ? (
              <Badge class={styles[`${anime?.season}-bg`]}>
                {anime.genres[1]}
              </Badge>
            ) : (
              ""
            )}
            {anime.genres[2] ? (
              <Badge class={styles[`${anime?.season}-bg`]}>
                {anime.genres[2]}
              </Badge>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  const item = ref ? <div ref={ref}>{animeItem}</div> : <div>{animeItem}</div>;

  return item;
});

export default ItemAnimeWithInfo;

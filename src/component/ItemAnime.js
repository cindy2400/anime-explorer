import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { animeActions } from "../store/anime/anime-slice";
import { ellipsis } from "../util/helper";
import styles from "./ItemAnime.module.css";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const ItemAnime = React.forwardRef(({ anime, page }, ref) => {
  const dispatch = useDispatch();

  const renewDetailHandler = () => {
    dispatch(animeActions.removeDetailAnime());
  };

  const animeItem = (
    <Link
      key={anime.id}
      to={`/anime/${anime.id}`}
      className={`${styles.link} ${styles.tooltip}`}
      onClick={renewDetailHandler}
    >
      {/* tooltip */}
      <div className={page === "home" ? styles.right : styles.top}>
        <div className={styles["flex-item"]}>
          <h3 className={styles[`${anime?.season}`]}>
            {anime.season ? anime.season + " " + anime.seasonYear : "-"}
          </h3>
          <Badge
            class={
              anime.averageScore > 70
                ? styles["green-color"]
                : styles["yellow-color"]
            }
          >
            {anime.averageScore || "-"}%
          </Badge>
        </div>
        <h4>{anime.status}</h4>
        <p>{anime.episodes ? anime.episodes + " episodes" : ""}</p>
        <div className={styles["flex-item"]}>
          {anime.genres[0] ? <Badge>{anime.genres[0]}</Badge> : ""}
          {anime.genres[1] ? <Badge>{anime.genres[1]}</Badge> : ""}
          {anime.genres[2] ? <Badge>{anime.genres[2]}</Badge> : ""}
        </div>
      </div>
      {/* end tooltip */}
      <Card className={styles.card}>
        <LazyLoadImage
          width={180}
          height={250}
          src={anime.coverImage.large}
          effect="blur"
          style={{ borderRadius: 12 }}
        />
        <p className={styles.title}>
          {ellipsis(anime?.title?.english || "") ||
            ellipsis(anime?.title?.romaji || "")}
        </p>
      </Card>
    </Link>
  );

  const item = ref ? <div ref={ref}>{animeItem}</div> : <div>{animeItem}</div>;

  return item;
});

export default ItemAnime;

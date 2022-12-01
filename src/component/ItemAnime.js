import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./ItemAnime.module.css";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const ItemAnime = React.forwardRef(({ anime }, ref) => {
  const dispatch = useDispatch();

  const renewDetailHandler = () => {
    dispatch(animeActions.removeDetailAnime());
  };

  const animeItem = (
    <Link
      key={anime.id}
      to={`/home/${anime.id}`}
      className={styles.link}
      onClick={renewDetailHandler}
    >
      <Card className={styles.card}>
        <p className={styles.title}>
          {anime.title.english || anime.title.romaji}
        </p>
        <Badge>{`${anime.season}, ${anime.seasonYear}`}</Badge>
        <LazyLoadImage
          width={180}
          height="auto"
          src={anime.coverImage.large}
          effect="blur"
        />
      </Card>
    </Link>
  );

  const item = ref ? <div ref={ref}>{animeItem}</div> : <div>{animeItem}</div>;

  return item;
});

export default ItemAnime;

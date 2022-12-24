import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./ItemAnime.module.css";
import Card from "./ui/Card";

const ItemAnime = React.forwardRef(({ anime }, ref) => {
  const dispatch = useDispatch();

  const renewDetailHandler = () => {
    dispatch(animeActions.removeDetailAnime());
  };

  const animeItem = (
    <Link
      key={anime.id}
      to={`/anime/${anime.id}`}
      className={styles.link}
      onClick={renewDetailHandler}
    >
      <Card className={styles.card}>
        <LazyLoadImage
          width={180}
          height="auto"
          src={anime.coverImage.large}
          effect="blur"
        />
        <p className={styles.title}>
          {anime.title.english || anime.title.romaji}
        </p>
      </Card>
    </Link>
  );

  const item = ref ? <div ref={ref}>{animeItem}</div> : <div>{animeItem}</div>;

  return item;
});

export default ItemAnime;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FavoritesAnime.module.css";
import Card from "./ui/Card";

const FavoritesAnime = () => {
  const favoriteAnimes = useSelector((state) => state.anime.animeFavorites);

  if (favoriteAnimes.length === 0) {
    return <h3 className={styles["empty-anime"]}>Favorite Animes Empty...</h3>;
  }
  return (
    <div className={styles.container}>
      {favoriteAnimes.map((anime) => {
        return (
          <Link key={anime.id} to={`/anime/${anime.id}`} className={styles.link}>
            <Card className={styles.card}>
              <img
                className={styles.image}
                src={anime.coverImage.large}
                alt="cover anime"
              />
              <p>{anime.title.english || anime.title.romaji}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default FavoritesAnime;

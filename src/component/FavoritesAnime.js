import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FavoritesAnime.module.css";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const FavoritesAnime = () => {
  const favoriteAnimes = useSelector((state) => state.home.animeFavorites);

  if (favoriteAnimes.length === 0) {
    return <p>Favorite Animes Empty...</p>;
  }
  return (
    <div className={styles.container}>
      {favoriteAnimes.map((anime) => {
        return (
          <Link key={anime.id} to={`/home/${anime.id}`} className={styles.link}>
            <Card className={styles.card}>
              <p>{anime.title.english || anime.title.romaji}</p>
              <Badge>{`${anime.season}, ${anime.seasonYear}`}</Badge>
              <img src={anime.coverImage.large} alt="cover anime" />
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default FavoritesAnime;

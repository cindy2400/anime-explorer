import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPopularAnime,
  fetchTrendingAnime,
  fetchUpcomingAnime,
} from "../store/anime/anime-fetcher";
import styles from "./Home.module.css";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.home.animes);

  useEffect(() => {
    if (type === "trending") {
      dispatch(fetchTrendingAnime());
    } else if (type === "popular") {
      dispatch(fetchPopularAnime());
    } else if (type === "upcoming") {
      dispatch(fetchUpcomingAnime());
    }
  }, [dispatch, type]);

  return (
    <div className={styles.container}>
      {animes.map((anime) => {
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

export default Home;

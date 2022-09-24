import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnime } from "../store/anime/anime-fetcher";
import styles from "./Home.module.css";
import Card from "./ui/Card";

const Home = () => {
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.home.animes);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {animes.map((anime) => {
        return (
          <Link key={anime.id} to={`/home/${anime.id}`}>
            <Card className={styles.card}>
              <p>{anime.title.english || anime.title.romaji}</p>
              <img src={anime.coverImage.large} alt="cover anime" />
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;

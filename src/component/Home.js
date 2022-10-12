import React, { useEffect, useState } from "react";
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
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    if (type === "trending") {
      dispatch(fetchTrendingAnime());
    } else if (type === "popular") {
      dispatch(fetchPopularAnime());
    } else if (type === "upcoming") {
      dispatch(fetchUpcomingAnime());
    }
  }, [dispatch, type]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setFilteredAnime(
        animes.filter((anime) =>
          anime.title.english.toLowerCase().includes(searchText)
        )
      );
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [animes, searchText]);

  const changeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
          onChange={changeSearchTextHandler}
        />
      </form>
      <div className={styles.container}>
        {filteredAnime.map((anime) => {
          return (
            <Link
              key={anime.id}
              to={`/home/${anime.id}`}
              className={styles.link}
            >
              <Card className={styles.card}>
                <p>{anime.title.english || anime.title.romaji}</p>
                <Badge>{`${anime.season}, ${anime.seasonYear}`}</Badge>
                <img src={anime.coverImage.large} alt="cover anime" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

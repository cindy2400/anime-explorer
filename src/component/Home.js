import React, { useEffect, useMemo, useState } from "react";
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
  const [filterSeason, setFilterSeason] = useState("all");

  let seasons = useMemo(
    () => [...new Set(animes.map((anime) => anime.season))],
    [animes]
  );

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
      let animeFilter = animes;
      if (filterSeason === "all") {
        animeFilter = animes.filter((anime) => {
          const animeTitle = anime.title.english || anime.title.romaji;
          return animeTitle.toLowerCase().includes(searchText);
        });
      } else if (filterSeason !== "all" && searchText !== "") {
        animeFilter = animes.filter((anime) => {
          const animeTitle = anime.title.english || anime.title.romaji;
          return (
            animeTitle.toLowerCase().includes(searchText) &&
            anime.season.toLowerCase() === filterSeason
          );
        });
      } else {
        animeFilter = animes.filter((anime) => {
          return anime.season.toLowerCase() === filterSeason;
        });
      }
      setFilteredAnime(animeFilter);
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [animes, filterSeason, searchText]);

  const changeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const changeFilterSeasonHandler = (e) => {
    setFilterSeason(e.target.value);
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
        <select className={styles.select} onChange={changeFilterSeasonHandler}>
          <option value="all">All</option>
          {seasons.map((season) => (
            <option key={season} value={season.toLowerCase()}>
              {season}
            </option>
          ))}
        </select>
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

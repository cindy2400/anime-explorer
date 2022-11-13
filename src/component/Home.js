import React, { useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  fetchPopularAnime,
  fetchTrendingAnime,
  fetchUpcomingAnime,
} from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./Home.module.css";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const animes = useSelector((state) => state.home.animes);
  const [filterSeason, setFilterSeason] = useState("all");

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [searchText, setSearchText] = useState(searchTemp);

  let seasons = useMemo(
    () => [...new Set(animes.map((anime) => anime.season))],
    [animes]
  );

  useEffect(() => {
    if (type === "trending") {
      dispatch(fetchTrendingAnime(searchTemp, filterSeason));
    } else if (type === "popular") {
      dispatch(fetchPopularAnime(searchTemp, filterSeason));
    } else if (type === "upcoming") {
      dispatch(fetchUpcomingAnime(searchTemp, filterSeason));
    }
  }, [dispatch, searchTemp, filterSeason, type]);

  useEffect(() => {
    const getSearchAnime = setTimeout(() => {
      history.push(`${location.pathname}?search=${searchText}`);
    }, 1000);

    return () => {
      clearTimeout(getSearchAnime);
    };
  }, [dispatch, history, location.pathname, searchText]);

  const changeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const changeFilterSeasonHandler = (e) => {
    setFilterSeason(e.target.value);
  };

  const renewDetailHandler = () => {
    dispatch(animeActions.removeDetailAnime());
  };

  return (
    <div>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
          onChange={changeSearchTextHandler}
          value={searchText}
        />
        <select className={styles.select} onChange={changeFilterSeasonHandler}>
          <option value="all">All</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
      </form>
      <div className={styles.container}>
        {animes.map((anime) => {
          return (
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
        })}
      </div>
    </div>
  );
};

export default Home;

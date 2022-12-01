import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchPopularAnime,
  fetchTrendingAnime,
  fetchUpcomingAnime,
} from "../store/anime/anime-fetcher";
import styles from "./Home.module.css";
import ItemAnime from "./ItemAnime";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const animes = useSelector((state) => state.home.animes);
  const pageInfo = useSelector((state) => state.home.pageInfo);
  const [filterSeason, setFilterSeason] = useState("all");

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [searchText, setSearchText] = useState(searchTemp);
  const seasons = ["WINTER", "SUMMER", "SPRING", "FALL"];
  const [pageNum, setPageNum] = useState(1);
  const intObserver = useRef();

  useEffect(() => {
    if (type === "trending") {
      console.log("trending ");
      dispatch(fetchTrendingAnime(pageNum, searchTemp, filterSeason));
    } else if (type === "popular") {
      dispatch(fetchPopularAnime(pageNum, searchTemp, filterSeason));
    } else if (type === "upcoming") {
      dispatch(fetchUpcomingAnime(pageNum, searchTemp, filterSeason));
    }
  }, [dispatch, searchTemp, filterSeason, type, pageNum]);

  useEffect(() => {
    const getSearchAnime = setTimeout(() => {
      setPageNum(1);
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
    setPageNum(1);
    setFilterSeason(e.target.value);
  };

  const lastPostRef = useCallback(
    (item) => {
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && pageInfo.hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (item) intObserver.current.observe(item);
    },
    [pageInfo]
  );

  const content = animes.map((anime, i) => {
    if (animes.length === i + 1) {
      return <ItemAnime key={anime.id} ref={lastPostRef} anime={anime} />;
    } else {
      return <ItemAnime key={anime.id} anime={anime} />;
    }
  });

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
      <div className={styles.container}>{content}</div>
    </div>
  );
};

export default Home;

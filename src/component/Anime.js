import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchPopularAnime,
  fetchTrendingAnime,
} from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./Anime.module.css";
import ItemAnime from "./ItemAnime";

const Anime = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const animes = useSelector((state) => state.anime.animes);
  const pageInfo = useSelector((state) => state.anime.pageInfo);
  const [filterSeason, setFilterSeason] = useState("all");

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [searchText, setSearchText] = useState(searchTemp);
  const seasons = ["WINTER", "SUMMER", "SPRING", "FALL"];
  const [pageNum, setPageNum] = useState(1);
  const intObserver = useRef();

  useEffect(() => {
    type === "trending"
      ? dispatch(fetchTrendingAnime(pageNum, searchTemp, filterSeason))
      : dispatch(fetchPopularAnime(pageNum, searchTemp, filterSeason));
  }, [dispatch, searchTemp, filterSeason, type, pageNum]);

  useEffect(() => {
    dispatch(animeActions.removeAnime());
    const getSearchAnime = setTimeout(() => {
      setPageNum(1);
      if (searchText === "") {
        history.push(`${location.pathname}`);
      } else {
        history.push(`${location.pathname}?search=${searchText}`);
      }
    }, 1000);

    return () => {
      clearTimeout(getSearchAnime);
    };
  }, [dispatch, history, location.pathname, searchText]);

  const changeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const changeFilterSeasonHandler = (e) => {
    dispatch(animeActions.removeAnime());
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
      <h3 className={styles["core-title"]}>
        {type === "trending" ? "TRENDING ANIME" : "POPULAR ANIME"}
      </h3>
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

export default Anime;

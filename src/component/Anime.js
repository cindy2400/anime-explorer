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
import Loading from "./ui/Loading";

const Anime = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const animes = useSelector((state) => state.anime.animes);
  const pageInfo = useSelector((state) => state.anime.pageInfo);

  const queryParams = new URLSearchParams(location.search);

  const seasonQuery = queryParams.get("season");
  const seasonTemp = seasonQuery === null ? "ALL" : seasonQuery;
  const [filterSeason, setFilterSeason] = useState(seasonTemp.toUpperCase());

  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [searchText, setSearchText] = useState(searchTemp);

  const seasons = ["WINTER", "SUMMER", "SPRING", "FALL"];
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Phychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sport",
    "Supernatural",
    "Thriller",
  ];

  const genreQuery = queryParams.get("genre");
  const genreTemp = genreQuery === null ? "all" : genreQuery;
  const [genreSelected, setGenreSelected] = useState(genreTemp);

  const [pageNum, setPageNum] = useState(1);
  const intObserver = useRef();

  useEffect(() => {
    type === "trending"
      ? dispatch(
          fetchTrendingAnime(pageNum, searchTemp, filterSeason, genreSelected)
        )
      : dispatch(
          fetchPopularAnime(pageNum, searchTemp, filterSeason, genreSelected)
        );
  }, [dispatch, searchTemp, filterSeason, type, pageNum, genreSelected]);

  useEffect(() => {
    dispatch(animeActions.removeAnime());
    const getSearchAnime = setTimeout(() => {
      setPageNum(1);
      history.push(
        `${location.pathname}?search=${searchText}&season=${filterSeason}&genre=${genreSelected}`
      );
    }, 1000);

    return () => {
      clearTimeout(getSearchAnime);
    };
  }, [
    dispatch,
    filterSeason,
    genreSelected,
    history,
    location.pathname,
    searchText,
  ]);

  const changeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const changeFilterSeasonHandler = (e) => {
    setFilterSeason(e.target.value);
  };

  const changeFilterGenreHandler = (e) => {
    setGenreSelected(e.target.value);
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
        <div className={styles["search-filter-col"]}>
          <p className={styles["search-filter-title"]}>Search</p>
          <input
            type="text"
            placeholder="Search..."
            className={styles.input}
            onChange={changeSearchTextHandler}
            value={searchText}
          />
        </div>

        <div className={`${styles["search-filter-col"]} ${styles.filter}`}>
          <p className={styles["search-filter-title"]}>Season</p>
          <select
            className={styles.select}
            value={filterSeason}
            onChange={changeFilterSeasonHandler}
          >
            <option value="ALL">All</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles["search-filter-col"]} ${styles.filter}`}>
          <p className={styles["search-filter-title"]}>Genre</p>
          <select
            className={styles.select}
            value={genreSelected}
            onChange={changeFilterGenreHandler}
          >
            <option value="all">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </form>

      {animes.length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </div>
  );
};

export default Anime;

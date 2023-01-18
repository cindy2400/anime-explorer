import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdGridView, MdViewComfy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchPopularAnime,
  fetchTrendingAnime,
} from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./Anime.module.css";
import ItemAnime from "./ItemAnime";
import ItemAnimeWithInfo from "./ItemAnimeWithInfo";
import Loading from "./ui/Loading";
import SearchFilterSection from "./ui/SearchFilterSection";

const Anime = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const animes = useSelector((state) => state.anime.animes);
  const pageInfo = useSelector((state) => state.anime.pageInfo);

  const [layoutFormat, setLayoutFormat] = useState("card");

  const queryParams = new URLSearchParams(location.search);

  const seasonQuery = queryParams.get("season");
  const seasonTemp = seasonQuery === null ? "ALL" : seasonQuery;
  const [filterSeason, setFilterSeason] = useState(seasonTemp.toUpperCase());

  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [searchText, setSearchText] = useState(searchTemp);

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
      if (layoutFormat === "card") {
        return <ItemAnime key={anime.id} ref={lastPostRef} anime={anime} />;
      } else {
        return (
          <ItemAnimeWithInfo key={anime.id} ref={lastPostRef} anime={anime} />
        );
      }
    } else {
      if (layoutFormat === "card") {
        return <ItemAnime key={anime.id} anime={anime} />;
      } else {
        return <ItemAnimeWithInfo key={anime.id} anime={anime} />;
      }
    }
  });

  return (
    <div>
      <h3 className={styles["core-title"]}>
        {type === "trending" ? "TRENDING ANIME" : "POPULAR ANIME"}
      </h3>

      <div className={styles["format-section"]}>
        <SearchFilterSection
          changeSearchTextHandler={changeSearchTextHandler}
          searchText={searchText}
          filterSeason={filterSeason}
          changeFilterSeasonHandler={changeFilterSeasonHandler}
          genreSelected={genreSelected}
          changeFilterGenreHandler={changeFilterGenreHandler}
        />

        <div className={styles["button-section"]}>
          <button
            onClick={() => setLayoutFormat("card")}
            className={`${styles["button-card"]} ${
              layoutFormat === "card" ? styles["active-button"] : ""
            }`}
          >
            <MdViewComfy />
          </button>
          <button
            onClick={() => setLayoutFormat("list")}
            className={`${styles["button-list"]} ${
              layoutFormat === "list" ? styles["active-button"] : ""
            }`}
          >
            <MdGridView />
          </button>
        </div>
      </div>

      {animes.length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </div>
  );
};

export default Anime;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  fetchPopularAnimePreview,
  fetchTrendingAnimePreview,
} from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./Home.module.css";
import ItemAnime from "./ItemAnime";
import SearchFilterSection from "./ui/SearchFilterSection";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const trendingAnime = useSelector(
    (state) => state.anime.animeTrendingPreview
  );
  const popularAnime = useSelector((state) => state.anime.animePopularPreview);

  const [searchText, setSearchText] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("ALL");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("trending");

  const sorts = ["trending", "popular"];

  const removeStateHandler = () => {
    dispatch(animeActions.removeAnime());
  };

  useEffect(() => {
    dispatch(fetchPopularAnimePreview());
    dispatch(fetchTrendingAnimePreview());
  }, [dispatch]);

  useEffect(() => {
    const searchFilterTimeout = setTimeout(() => {
      if (
        searchText !== "" ||
        seasonFilter !== "ALL" ||
        genreFilter !== "all"
      ) {
        history.push(
          `${sortFilter}?search=${searchText}&season=${seasonFilter}&genre=${genreFilter}`
        );
      }
    }, 1000);

    return () => clearTimeout(searchFilterTimeout);
  }, [searchText, seasonFilter, genreFilter, history, sortFilter]);

  const onChangeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const onChangeSeasonFilterHandler = (e) => {
    setSeasonFilter(e.target.value);
  };

  const onChangeGenreFilterHandler = (e) => {
    setGenreFilter(e.target.value);
  };

  const onChangeSortFilterHandler = (e) => {
    setSortFilter(e.target.value);
  };

  return (
    <div>
      <div className={styles["search-filter-section"]}>
        <SearchFilterSection
          searchText={searchText}
          changeSearchTextHandler={onChangeSearchTextHandler}
          filterSeason={seasonFilter}
          changeFilterSeasonHandler={onChangeSeasonFilterHandler}
          genreSelected={genreFilter}
          changeFilterGenreHandler={onChangeGenreFilterHandler}
        />
        <div className={`${styles["search-filter-col"]} ${styles.filter}`}>
          <p className={styles["search-filter-title"]}>Sort</p>
          <select
            className={styles.select}
            value={sortFilter}
            onChange={onChangeSortFilterHandler}
          >
            {sorts.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles["section-one"]}>
        <h3>TRENDING ANIME</h3>
        <Link
          to="/trending"
          className={styles.link}
          onClick={removeStateHandler}
        >
          View all
        </Link>
      </div>
      <div className={styles["section-two"]}>
        {trendingAnime.map((anime) => (
          <ItemAnime key={anime.id} anime={anime} />
        ))}
      </div>
      <div className={styles["section-one"]}>
        <h3>POPULAR ANIME</h3>
        <Link
          to="/popular"
          className={styles.link}
          onClick={removeStateHandler}
        >
          View all
        </Link>
      </div>
      <div className={styles["section-two"]}>
        {popularAnime.map((anime) => (
          <ItemAnime key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Home;

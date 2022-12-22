import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPopularAnimePreview,
  fetchTrendingAnimePreview,
} from "../store/anime/anime-fetcher";
import { animeActions } from "../store/anime/anime-slice";
import styles from "./Home.module.css";
import ItemAnime from "./ItemAnime";

const Home = () => {
  const dispatch = useDispatch();
  const trendingAnime = useSelector(
    (state) => state.anime.animeTrendingPreview
  );
  const popularAnime = useSelector((state) => state.anime.animePopularPreview);

  const removeStateHandler = () => {
    dispatch(animeActions.removeAnime());
  };

  useEffect(() => {
    dispatch(fetchPopularAnimePreview());
    dispatch(fetchTrendingAnimePreview());
  }, [dispatch]);

  return (
    <div>
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

import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { animeActions } from "../../store/anime/anime-slice";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const removeStateHandler = () => {
    dispatch(animeActions.removeAnime());
  };

  return (
    <div className={styles["header-box"]}>
      <div className={styles["header-alignment"]}>
        <Link to="/" className={styles.title}>
          Anime Explorer
        </Link>
        <div className={styles["header-nav"]}>
          <>
            {/* <NavLink
              activeClassName={styles["nav-link"]}
              to="/trending"
              className={styles.link}
              onClick={removeStateHandler}
            >
              Trending
            </NavLink>
            <NavLink
              activeClassName={styles["nav-link"]}
              to="/popular"
              className={styles.link}
              onClick={removeStateHandler}
            >
              Popular
            </NavLink> */}
            <NavLink
              activeClassName={styles["nav-link"]}
              to="/favorites"
              className={styles.link}
            >
              Favorites
            </NavLink>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;

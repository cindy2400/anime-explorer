import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { animeActions } from "../../store/anime/anime-slice";
import { authActions } from "../../store/auth/auth-slice";
import styles from "./Header.module.css";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };

  const removeStateHandler = () => {
    dispatch(animeActions.removeAnime());
  };

  return (
    <div className={styles["header-box"]}>
      <div className={styles["header-alignment"]}>
        <Link to="/home" className={styles.title}>
          Anime Explorer
        </Link>
        <div className={styles["header-nav"]}>
          {!token && (
            <>
              <NavLink
                activeClassName={styles["nav-link"]}
                to="/login"
                className={styles.link}
              >
                Login
              </NavLink>
              <NavLink
                activeClassName={styles["nav-link"]}
                to="/register"
                className={styles.link}
              >
                Register
              </NavLink>
            </>
          )}
          {token && (
            <>
              <NavLink
                activeClassName={styles["nav-link"]}
                to="/home"
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
              </NavLink>
              {/* <Link to="/upcoming" className={styles.link}>
                Upcoming
              </Link> */}
              <NavLink
                activeClassName={styles["nav-link"]}
                to="/favorites"
                className={styles.link}
              >
                Favorites
              </NavLink>
              <NavLink
                activeClassName={styles["nav-link"]}
                to="/logout"
                onClick={logoutHandler}
                className={styles.link}
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

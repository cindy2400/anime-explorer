import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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

  return (
    <div className={styles["header-box"]}>
      <div className={styles["header-alignment"]}>
        <h2 className={styles.title}>Anime Explorer</h2>
        <div className={styles["header-nav"]}>
          {!token && (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}
          {token && (
            <>
              <Link to="/home" className={styles.link}>
                Trending
              </Link>
              <Link to="/popular" className={styles.link}>
                Popular
              </Link>
              <Link to="/upcoming" className={styles.link}>
                Upcoming
              </Link>
              <Link
                to="/logout"
                onClick={logoutHandler}
                className={styles.link}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

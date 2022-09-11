import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["header-box"]}>
      <div className={styles["header-alignment"]}>
        <h2 className={styles.title}>Anime Explorer</h2>
        <div className={styles["header-nav"]}>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

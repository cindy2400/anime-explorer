import React from "react";
import styles from "./Badge.module.css";

const Badge = (props) => {
  return (
    <div className={`${styles.badge} ${props.class}`}>{props.children}</div>
  );
};

export default Badge;

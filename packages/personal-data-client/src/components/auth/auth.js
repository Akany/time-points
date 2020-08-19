import React from "react";
import styles from "./auth.module.scss";
import { useHistory } from "react-router-dom";

export const Auth = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <span className={styles.title}>Welcome Back</span>
      <input className={styles.input} type="email" placeholder="Email" />
      <input className={styles.input} type="password" placeholder="Password" />
      <div className={styles.buttonHolder}>
        <span className={styles.text}>Sign In</span>
        <button className={styles.button} onClick={handleClick}>
          &#10142;
        </button>
      </div>
    </div>
  );

  function handleClick() {
    history.push("/home-page");
  }
};

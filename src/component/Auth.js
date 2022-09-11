import React from "react";
import Card from "./ui/Card";
import styles from "./Auth.module.css";
import { useRef } from "react";
import { loginData, registerData } from "../store/auth/auth-fetcher";
import { useSelector, useDispatch } from "react-redux";

const Auth = ({ type }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const emailRef = useRef();
  const passwordRef = useRef();

  const authHandler = (e) => {
    e.preventDefault();

    const data = {
      "email": `${emailRef.current.value}`,
      "password": `${passwordRef.current.value}`
    }

    if(type === 'login'){
      dispatch(loginData(data))
    }else{
      dispatch(registerData(data))
    }
  };

  console.log(token)

  return (
    <div className={styles.content}>
      <Card>
        {type === "login" ? (
          <h1 className={styles.title}>Login</h1>
        ) : (
          <h1 className={styles.title}>Register</h1>
        )}
        <form onSubmit={authHandler}>
          <ul className={styles.bullets}>
            <li>
              <input type="text" ref={emailRef} placeholder="Email" />
            </li>
            <li>
              <input type="password" ref={passwordRef} placeholder="Password" />
            </li>
          </ul>
          <div className={styles["auth-button"]}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Auth;

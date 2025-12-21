

import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link,useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { colors } from "@mui/material";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate()
  const navStateData = useLocation();
  // console.log(navStateData);


  const signInHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading({ signIn: true, signUp: false });

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
       navigate(navStateData?.state?.redirect || "/")
    } catch (err) {
      setError(err.message);
     
    } finally {
      setLoading({ signIn: false, signUp: false });
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading({ signIn: false, signUp: true });

    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      }); 
      navigate(navStateData?.state?.redirect || "/" );
    } catch (err) {
      setError(err.message);
        
    } finally {
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo  */}
      <Link to="/">
        <img
          src="https://purepng.com/public/uploads/large/amazon-logo-s3f.png"
          alt="Amazon"
        />
      </Link>
      {/* form  */}

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={signInHandler}
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader color="#fff" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By Signing-in you agree to the AMAZON FAKE CLONE Conditions of Use and
          Sale. Please see our privacy notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>

        <button
          onClick={signUpHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#fff" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ color: "red", marginTop: "8px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;



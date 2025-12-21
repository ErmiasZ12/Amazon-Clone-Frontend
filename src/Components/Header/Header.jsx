

import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { signOut } from "firebase/auth";
import { Type } from "../../Utility/action.type";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch({
      type: Type.SET_USER,
      user: null,
    });
    navigate("/");
  };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              <SlLocationPin />
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select>
              <option>All</option>
           </select>
            <input type="text" />
            <BsSearch size={25} />
             
          </div>

          <div className={classes.order__container}>
            <Link className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/2560px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
                alt="lang"
              />
             
              <select>
                <option>EN</option>
              </select>
            </Link>

            {/* Auth section */}
            {user ? (
              <div onClick={handleSignOut} className={classes.auth}>
                <p>Hello {user.email.split("@")[0]}</p>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/auth" className={classes.auth}>
                <p>Hello, Sign In</p>
                <span>Account & Lists</span>
              </Link>
            )}

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
}

export default Header;

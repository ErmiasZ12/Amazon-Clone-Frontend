import React from 'react'
import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

function Header() {
  return (
    <>
    <section>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
          <a href="#">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </a>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p> Delivered to</p>
              <span> Ethiopia </span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All </option>
          </select>
          <input type="text" />
          <BsSearch size={25} />
        </div>
        <div className={classes.order__container}>
          <a href="" className={classes.language}>
            <img
              src="https://th.bing.com/th/id/R.e64dd636e5e9873e7c46c78b006da7fb?rik=V05NvLlmtetTIA&pid=ImgRaw&r=0"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </a>
          <a href="">
            <p> Sign In</p>
            <span> Account & List</span>
          </a>
          <a href="">
            <p> returns</p>
            <span> & Orders</span>
          </a>
          <a href="" className={classes.cart}>
            <BiCart size={35} />
            <span> 0</span>
          </a>
        </div>
      </div>
    </section>
    <LowerHeader/>
    </>
  );
}

export default Header
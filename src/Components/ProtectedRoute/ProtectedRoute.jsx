// import React,{useContext, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
// import { DataContext } from '../DataProvider/DataProvider'

// const ProtectedRoute = (children,msg,redirect) => {

// const navigate = useNavigate()
// const[{user}, dispatch] = useContext(DataContext);

// useEffect (() => {
//     if(!user){
//         navigate("/auth", {state:{msg}})
//     }

// },[user])
//   return children;
  
//   }

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: {
          msg,
          redirect: redirect || "/"
        }
      });
    }
  }, [user, navigate, msg, redirect]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;

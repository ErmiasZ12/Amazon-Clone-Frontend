// import React,{useContext} from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import classes from './Payment.module.css'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import ProductCard from '../../Components/Product/ProductCard'

// function Payment() {
//   const [{user, basket}] = useContext(DataContext);
//   // console.log(user);
//   const totalItem = basket?.reduce((amount,item) =>{
//     return item.amount + amount;
//   },0);

//   return(
//     <LayOut>
//       {/* header */}

//        <div className={classes.payment_header}>
//         Checkout ({totalItem}) items </div>

//        {/* payment method */}
//        <section className={classes.payment}>
//         {/* address */}

//         <div className= {classes.flex}>
//           <h3> Delivery Address</h3>
//           <div>
//           <div> {user?.email}</div>
//           <div> 123 React Lane</div>
//           <div> Chicago, IL </div>
//         </div>
//          </div>
//         {/* product */}
//         <div className={classes.flex}>
//           <h3> review items and delivery</h3>
//           <div>
//             {
//               basket?.map((item) => <ProductCard product ={item} flex={true}/>)
//             }
//           </div>
//         </div>

//         {/* card form */}
//         <div> </div>
//        </section>

//     </LayOut>

//   )
// }

// export default Payment

import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  // Hooks
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // 🔐 AUTH GUARD (CRITICAL)
  if (!user) {
    return (
      <LayOut>
        <p>Loading payment details...</p>
      </LayOut>
    );
  }

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    // const handlePayment = async (e) => {
    //   e.preventDefault();

    //   if (!stripe || !elements) return;

    try {
      setProcessing(true);
      // 1. backend || function ---> convert to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
      //   basket:basket,
      //   amount:paymentIntent.amount,
      //   created: paymentIntent.created,
      // })
      // console.log(paymentIntent);

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      // console.log(error);
      setProcessing(false);
    }

    // 2. client side (react side confirmation)

    // 3. after the confirmation--> order firestore database BiSave, claer basket
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        {/* products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard
                key={item.id} // ✅ REQUIRED
                product={item}
                flex={true}
              />
            ))}
          </div>
        </div>

        {/* card form */}

        {/* <div className={classes.flex}> 
         <h3> Payment Method</h3>
         <div className={classes.payment_card_container}>
          <div> 
            <form action =""> 
              { cardError && <small style={{color:"red"}}> {cardError}</small>}
              <CardElement onchange = {handleChange}/>
               </form>
          </div>
           </div>
        </div> */}

        <div className={classes.flex}>
          <h3>Payment Method</h3>

          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        {" "}
                        <ClipLoader color="gray" size={12} />
                        <p> Please Wait...</p>{" "}
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

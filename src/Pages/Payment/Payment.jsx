

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
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // Hooks
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  //  AUTH GUARD (CRITICAL)
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


      // if (!stripe || !elements || basket.length ===0) return;

    try {
      setProcessing(true);
      // 1. backend || function ---> convert to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });

      if(error){
       setCardError(error.message);
       setProcessing(false);
       return; 
      }
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // empty the basket 

   dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
   
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
       setCardError("Payment failed. Please try again.");
    }

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

                  <button type="submit" disabled={processing || !stripe}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} />
                        <p>Please Wait...</p>
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

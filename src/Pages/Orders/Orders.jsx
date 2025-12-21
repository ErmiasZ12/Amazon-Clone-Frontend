
import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>

          <div>
            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order Id: {eachOrder.id}</p>

                  {eachOrder.data?.basket?.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      flex={true}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;


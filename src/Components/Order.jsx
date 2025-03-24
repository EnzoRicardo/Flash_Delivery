import React from "react";
import "./Order.css";
import video from "../assets/Banner 2.mp4"


const Order = () => {
  return (
    <section className="order">
      <div className="banner">
        <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
        </video>
      </div>
         
      <div className="cards">

      </div>

    </section>
  );
};

export default Order;

import React from "react";
import "./Order.css";
import video from "../assets/Banner 2.mp4"
import cervejaIMG from "../assets/cards/Cerveja Card.png"
import refriIMG from "../assets/cards/Refri Card.png"
import dpIMG from "../assets/cards/Drinks Pronto.png"
import destiladoIMG from "../assets/cards/Destilados.png"
import vinhosIMG from "../assets/cards/Vinhos.png"
import aguaIMG from "../assets/cards/Agua.png"
import blob1 from "../assets/Figura 1.svg"
import blob2 from "../assets/Figura 2.svg"
import blob3 from "../assets/Figura3.svg"
import { useNavigate } from 'react-router-dom';
import RefriCard from "./RefriCard";
import CardComponent from "./CardComponent";


const Order = () => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/refri'); 
  };

  return (
    <section className="order-page">
      <div className="banner">
        <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
        </video>
      </div>

      <img src={blob1} className="blob1" />
      <img src={blob2} className="blob2" />
      <img src={blob3} className="blob3" />
      <h2 className="search-title">Selecione a <span className="drinkred">bebida</span> perfeita para sua <span className="drinkyellow">ocasião!</span></h2>
      

      <CardComponent />
    </section>
  );
};

export default Order;

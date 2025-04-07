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

      <div className="drinks-card-container">


        <div className="card-order">
          <div className="card-drinks">
            <img src={cervejaIMG} alt="Cerveja" />
            <p className="card-title">Cervejas</p>
          </div>  
        </div>

        <div className="card-order">
          <div className="card-drinks">
            <img src={refriIMG} alt="Refrigerantes" onClick={handleClick} />
            <p className="card-title">Refrigerantes</p>
          </div>  
        </div>

        <div className="card-order">
          <div className="card-drinks">
            <img src={dpIMG} alt="DP" />
            <p className="card-title">Drinks Prontos</p>
          </div>  
        </div>

        <div className="card-order">
          <div className="card-drinks">
            <img src={destiladoIMG} alt="Destilados" />
            <p className="card-title">Destilados</p>
          </div>  
        </div>

        <div className="card-order">
          <div className="card-drinks">
            <img src={vinhosIMG} alt="Vinhos" />
            <p className="card-title">Vinhos</p>
          </div>  
        </div>

        <div className="card-order">
          <div className="card-drinks">
            <img src={aguaIMG} alt="Vinhos" />
            <p className="card-title">Água</p>
          </div>  
        </div>


      </div>
      


    </section>
  );
};

export default Order;

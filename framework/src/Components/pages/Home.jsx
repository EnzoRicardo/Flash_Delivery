import React from "react";
import { Link } from "react-router-dom";
import figura1 from "../../assets/Blob 3.svg"
import figura2 from "../../assets/Blob 5.svg"
import figura3 from "../../assets/Blob 14.svg"
import card1 from "../../assets/Card 1.png"
import card2 from "../../assets/Card 2.png"
import card3 from "../../assets/Card 3.png"
import { motion } from "framer-motion";
import lata from "../../assets/lata nobg.png"
import Order from "../pages/Order";

const Hero = () => {
  return (
    <section className="textLP">
      <img src={figura1}  className="figure1" />
      <img src={figura2}  className="figure2" />
      <img src={figura3}  className="figure3" />
      <img src={lata}  className="lataFD" />
    <h1>
      <div className="left-align">SUA ENTREGA</div>
      <span>NA <motion.span className="yellow"
      initial={{ opacity: 0, y: 0 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}>VELOCIDADE</motion.span> DA SUA</span> <span className="red">SEDE.</span>
    </h1>
    <p className="description">
      Bebidas incríveis, entregues diretamente na sua porta, com a agilidade que você merece!
    </p>

    <Link to="/order">
        <button className="order-button">Pedir</button>
    </Link>
     

    <div className="cards">
      <h2>Como <span className="yellow">funciona</span>?</h2>
      <div className="cards-container">
        <div className="card">
          <img src={card1} alt="Chamou chegou" />
          <p>Chamou chegou!</p>
        </div>

        <div className="card">
          <img src={card2} alt="Variedade de produtos" />
          <p>Variedade de produtos!</p>
        </div>

        <div className="card">
          <img src={card3} alt="Chama a diversao" />
          <p>Chama a diversão!</p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;

import React from "react";
import { motion } from "framer-motion"; // Importa animação
import "./service.css";
import ServiceArea from "./ServiceArea";
import blob4 from "../assets/Figura 4.svg"
import blob5 from "../assets/Figura 5.svg"

const Service = () => {
  return (
    <section className="service">

      <img src={blob4} className="blob4" />
      <img src={blob5} className="blob5" />

      <div className="contato">
        <h2>Está com alguma <span className="red-service">dúvida?</span></h2> 
        <h3>Entre em contato conosco!</h3>
      </div>

      <br/>

      <div className="contato-icones">
        <i class="fa-brands fa-square-whatsapp"></i>
        <i class="fa-solid fa-square-phone"></i>
        <i class="fa-solid fa-square-envelope"></i>
      </div>

      <ServiceArea />

    </section>
  );
};

export default Service;

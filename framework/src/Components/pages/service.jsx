import React from "react";
import { motion } from "framer-motion"; // Importa animação
import "../css/service.css";
import MapaCuritiba from "./MapaCuritiba";
import blob4 from "../../assets/Figura 4.svg"
import blob5 from "../../assets/Figura 5.svg"
import blob6 from "../../assets/Figura 6.svg"
import blob7 from "../../assets/Figura 7.svg"
import blob8 from "../../assets/Figura8.svg"
import imgblob from "../../assets/img1.png"

const Service = () => {
  return (
    <section className="service">

      <img src={blob4} className="blob4" />
      <img src={blob5} className="blob5" />
      <img src={blob6} className="blob6" />
      <img src={blob7} className="blob7" />
      <img src={blob8} className="blob8" />
      <img src={imgblob} className="imgblob" />

      <div className="contato">
        <h2>Está com alguma <span className="red-service">dúvida?</span></h2> 
        <h3>Entre em contato conosco!</h3>
      </div>

      <br/>

      <div className="contato-icones">
        <i class="fa-brands fa-whatsapp"></i>
        <i class="fa-solid fa-phone"></i>
        <i class="fa-solid fa-envelope"></i>
      </div>
      
      <div className="regioes">
        <h3>Regiões que <span className="red-service">atendemos!</span></h3>
          <div className="lugares">
              <div className="localizacao">
               <i class="fa-solid fa-location-dot"></i>
               <h2>Curitiba</h2>
              </div>

              <div className="localizacao">
                <i className="fa-solid fa-location-dot"></i>
                <h2>São José dos Pinhais</h2>
              </div>

              <div className="localizacao">
                <i className="fa-solid fa-location-dot"></i>
                <h2>Fazenda Rio Grande</h2>
              </div>
          </div>
       </div>

      <MapaCuritiba />

    </section>
  );
};

export default Service;

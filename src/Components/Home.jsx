import React from "react";
import figura1 from "../assets/Blob 3.svg"
import figura2 from "../assets/Blob 5.svg"
import figura3 from "../assets/Blob 14.svg"
import figura4 from "../assets/Lightning 2.svg"



const Hero = () => {
  return (
    <section className="textLP">
      <img src={figura1}  className="figure1" />
      <img src={figura2}  className="figure2" />
      <img src={figura3}  className="figure3" />
      <img src={figura4}  className="figure4" />
    <h1>
      <div className="left-align">SUA ENTREGA</div>
      <span>NA <span className="yellow">VELOCIDADE</span> DA SUA</span> <span className="red">FOME.</span>
    </h1>
    <p className="description">
      Do seu restaurante favorito direto para a sua porta, na velocidade que você merece!
    </p>
    <button className="order">
      Pedir
    </button>
  </section>
  );
};

export default Hero;

import React from "react";

const Hero = () => {
  return (
    <section className="textLP">
      <img src="../src/assets/F1.png" alt="Imagem Geometrica" className="background-image" />
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

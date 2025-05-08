import React from "react";
import "../css/AboutUs.css";
import equipe from "../../assets/Equipe.jpeg"
import blob9 from "../../assets/Figura 9.svg"
import blob10 from "../../assets/Figura 10.svg"
import blob11 from "../../assets/Figura 11.svg"
import blob12 from "../../assets/Figura 12.svg"

const AboutUs = () => {
  return (
    <div className="text">

        <img src={blob9} className="blob9" />
        <img src={blob10} className="blob10" />
        <img src={blob11} className="blob11" />
        <img src={blob12} className="blob12" />

        <h2>Sobre <span className="red">Nós!</span></h2>
        <p>Somos uma empresa comprometida com a excelência no atendimento e na
            entrega de produtos e serviços de qualidade. Nossa missão é oferecer
            soluções inovadoras que atendam às necessidades de nossos clientes.</p>

        <div className="imagem">
            <img src={equipe} className="equipeFD" />
        </div>

        <p className="p2"> Com uma equipe dedicada e apaixonada pelo que faz, buscamos sempre
        aprimorar nossos processos e criar uma experiência única para você.</p>

        <div className="values">
        <h3>Nossos <span className="red">Valores</span></h3>
        <ul>
          <li><i class="fa-solid fa-user-check"></i> Qualidade e Excelência</li>
          <li><i class="fa-solid fa-user-check"></i> Compromisso com o Cliente</li>
          <li><i class="fa-solid fa-user-check"></i> Inovação e Tecnologia</li>
          <li><i class="fa-solid fa-user-check"></i> Ética e Transparência</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;

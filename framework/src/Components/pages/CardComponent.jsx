import React from 'react'
import "../css/CardComponent.css"
import cervejaIMG from "../../assets/cards/Cerveja Card.png"
import refriIMG from "../../assets/cards/Refri Card.png"
import dpIMG from "../../assets/cards/Drinks Pronto.png"
import destiladoIMG from "../../assets/cards/Destilados.png"
import vinhosIMG from "../../assets/cards/Vinhos.png"
import aguaIMG from "../../assets/cards/Agua.png"
import { useNavigate } from 'react-router-dom';

const CardComponent = () => {

    const navigate = useNavigate();
    
    const handleClickRefri = () => {
        navigate('/refri'); 
    };

  return (
    <div className="drinks-card-container">


    <div className="card-order">
      <div className="card-drinks">
        <img src={cervejaIMG} alt="Cerveja" />
        <p className="card-title">Cervejas</p>
      </div>  
    </div>

    <div className="card-order">
      <div className="card-drinks">
        <img src={refriIMG} alt="Refrigerantes" onClick={handleClickRefri} />
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
  );
};

export default CardComponent;

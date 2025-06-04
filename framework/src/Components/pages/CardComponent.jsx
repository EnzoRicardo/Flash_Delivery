import React, { useEffect, useState } from 'react'; // Removed 'use', added 'useState'
import "../css/CardComponent.css";
// Image imports are not used in the current logic for displaying dynamic categories,
// but you can reintegrate them if needed for specific static cards or default images.
import cervejaIMG from "../../assets/cards/Cerveja Card.png"
import refriIMG from "../../assets/cards/Refri Card.png"
import dpIMG from "../../assets/cards/Drinks Pronto.png"
import destiladoIMG from "../../assets/cards/Destilados.png"
import vinhosIMG from "../../assets/cards/Vinhos.png"
import aguaIMG from "../../assets/cards/Agua.png"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CardComponent = () => {

    const navigate = useNavigate();
    
    const checkAuthAndNavigate = (path) => {
      const isLogged = localStorage.getItem('userToken');
      if(isLogged){
        navigate(path);
      } else {
        toast.warn('Você precisa estar logado para acessar esta categoria.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
        navigate('/profile')
      }
    };

  return (
    <div className="drinks-card-container">


    <div className="card-order">
      <div className="card-drinks">
        <img src={cervejaIMG} alt="Cerveja" onClick={() => checkAuthAndNavigate('/refri')}/>
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
        <img src={dpIMG} alt="DP" onClick={() => checkAuthAndNavigate('/refri')} />
        <p className="card-title">Drinks Prontos</p>
      </div>  
    </div>

    <div className="card-order">
      <div className="card-drinks">
        <img src={destiladoIMG} alt="Destilados" onClick={() => checkAuthAndNavigate('/refri')} />
        <p className="card-title">Destilados</p>
      </div>  
    </div>

    <div className="card-order">
      <div className="card-drinks">
        <img src={vinhosIMG} alt="Vinhos" onClick={() => checkAuthAndNavigate('/refri')} />
        <p className="card-title">Vinhos</p>
      </div>  
    </div>

    <div className="card-order">
      <div className="card-drinks">
        <img src={aguaIMG} alt="Vinhos" onClick={() => checkAuthAndNavigate('/refri')} />
        <p className="card-title">Água</p>
      </div>  
    </div>


  </div>
  );
};

export default CardComponent;
import React, { useState } from 'react';
import "./RefriCard.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import coca from "../assets/cards/Coca Cola NOBG.png" // npm install lucide-react
import cocaZero from "../assets/cards/Coca Cola Zero NOBG.png"
import pepsi from "../assets/cards/Pepsi Card NOBG.png"
import pepsiZero from "../assets/cards/Pepsi Zero NOBG.png"
import cervejaIMG from "../assets/cards/Cerveja Card.png"
import refriIMG from "../assets/cards/Refri Card.png"
import dpIMG from "../assets/cards/Drinks Pronto.png"
import destiladoIMG from "../assets/cards/Destilados.png"
import vinhosIMG from "../assets/cards/Vinhos.png"
import aguaIMG from "../assets/cards/Agua.png"
import { useNavigate } from 'react-router-dom';

const refrigerantes = [
  {
    nome: 'Coca-Cola',
    volume: '350ml',
    preco: 'R$ 8,00',
    imagem: coca, 
  },
  {
    nome: 'Pepsi',
    volume: '350ml',
    preco: 'R$ 7,50',
    imagem: pepsi,
  },
  {
    nome: 'Coca-Cola Zero',
    volume: '350ml',
    preco: 'R$ 8,00',
    imagem: cocaZero,
  },
  {
    nome: 'Pepsi Zero',
    volume: '350ml',
    preco: 'R$ 7,50',
    imagem: pepsiZero,
  },
];

const RefriCard = () => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const total = refrigerantes.length;
  
    const changeImage = (nextIndex) => {
      setFade(true); // inicia fade-out
      setTimeout(() => {
        setIndex(nextIndex);
        setFade(false); // fade-in
      }, 100); // duração do fade
    };
  
    const next = () => changeImage((index + 1) % total);
    const prev = () => changeImage((index - 1 + total) % total);
  
    const atual = refrigerantes[index];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/refri'); 
    };
  
    return (
      <div className="refri-card-container">
        <div className="carousel">
          <button className="arrow left" onClick={prev}>
            <ChevronLeft size={48} />
          </button>
  
          <img
            src={atual.imagem}
            alt={atual.nome}
            className={`refri-img ${fade ? 'fade-out' : 'fade-in'}`}
          />
  
          <button className="arrow right" onClick={next}>
            <ChevronRight size={48} />
          </button>
        </div>
  
        <div className="refri-info">
          <div className="title-icon">
            <h2>{atual.nome}</h2>
            <i className="fa-solid fa-basket-shopping bagShop"></i>
          </div>
          <h3>{atual.volume}</h3>
          <p className="preco">{atual.preco}</p>
          <button className="botaoPedido">Adicionar</button>
          <input type="text" placeholder='Digite seu CEP' className='input-cep' />
        </div>

        
      </div>
    );
  };
export default RefriCard;

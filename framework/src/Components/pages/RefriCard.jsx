import React, { useState, useEffect } from 'react';
import "../css/RefriCard.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams adicionado
import CardComponent from './CardComponent';
import CompraJanela from './CompraJanela';

const RefriCard = () => {
  const [produtos, setProdutos] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { id } = useParams(); // Pegando o ID da categoria pela URL

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/refrigerantes?categoria=${id}`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, [id]);

  const total = produtos.length;

  const changeImage = (nextIndex) => {
    setFade(true);
    setTimeout(() => {
      setIndex(nextIndex);
      setFade(false);
    }, 100);
  };

  const next = () => changeImage((index + 1) % total);
  const prev = () => changeImage((index - 1 + total) % total);

  if (total === 0) return <p>Carregando produtos...</p>;

  const atual = produtos[index];

  return (
    <div className="refri-page">
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
            <h2>{atual.nome_produto}</h2>
            <i className="fa-solid fa-basket-shopping bagShop" onClick={abrirModal}></i>
            {mostrarModal && <CompraJanela produto={atual} onClose={fecharModal} />}
          </div>
          <h3>{atual.volume}</h3>
          <p className="preco">{atual.preco}</p>
          <button className="botaoPedido">Adicionar</button>
        </div>
      </div>

      <CardComponent />
    </div>
  );
};

export default RefriCard;

import React, { useState, useEffect } from 'react';
import "../css/RefriCard.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from './CardComponent';
import CompraJanela from './CompraJanela';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RefriCard = () => {
  const [produtos, setProdutos] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem("carrinho");
    return salvo ? JSON.parse(salvo) : [];
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/produtosCards?categoria=${id}`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, [id]);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

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

  const adicionarAoCarrinho = () => {
    setCarrinho((prev) => {
      const itemExistente = prev.find(item => item.id_produto === atual.id_produto);
      if (itemExistente) {
        return prev.map(item =>
          item.id_produto === atual.id_produto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Salva somente os dados essenciais
        const novoItem = {
          id_produto: atual.id_produto,
          nome_produto: atual.nome_produto,
          preco: atual.preco,
          quantidade: 1,
          volume: atual.volume,
        };
        return [...prev, novoItem];
      }
    });

    toast.success("Produto adicionado à sacola! 🛒", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  return (
    <div className="refri-page">
      <div className="refri-card-container">
        <div className="carousel">
          <button className="arrow left" onClick={prev}>
            <ChevronLeft size={48} />
          </button>

          <img
            src={atual.imagem}
            alt={atual.nome_produto}
            className={`refri-img ${fade ? 'fade-out' : 'fade-in'}`}
          />

          <button className="arrow right" onClick={next}>
            <ChevronRight size={48} />
          </button>
        </div>

        <div className="refri-info">
          <h2 className="produto-nome">{atual.nome_produto}</h2>
          <p className="produto-volume">{atual.volume}</p>
          <p className="produto-preco">R$ {Number(atual.preco).toFixed(2)}</p>

          <div className="compra-acoes">
            <button className="botaoPedido" onClick={adicionarAoCarrinho}>Adicionar</button>

            <div className="bag-container">
              <i className="fa-solid fa-basket-shopping bagShop" onClick={abrirModal}></i>
              {carrinho.length > 0 && (
                <span className="bag-count">
                  {carrinho.reduce((sum, item) => sum + item.quantidade, 0)}
                </span>
              )}
            </div>
          </div>

          {mostrarModal && (
            <CompraJanela
              carrinho={carrinho}
              setCarrinho={setCarrinho}
              onClose={fecharModal}
            />
          )}
        </div>
      </div>

      <CardComponent />
    </div>
  );
};

export default RefriCard;

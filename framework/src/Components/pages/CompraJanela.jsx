import React from 'react';
import "../css/CompraJanela.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CompraJanela = ({ carrinho, onClose, setCarrinho }) => {
  const navigate = useNavigate();
  const total = (carrinho || []).reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const removerItem = (id) => {
    setCarrinho((prev) => prev.filter(item => item.id_produto !== id));
  };

  const finalizarCompra = () => {
    onClose();
    navigate("/finalizar");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <i className="fa-solid fa-xmark fechar-icon" onClick={onClose}></i>
        <h4 className="title-bag">Sua sacola <i className="fa-solid fa-beer-mug-empty"></i></h4>

        {carrinho.length === 0 ? (
          <p className="description-bag">Carrinho vazio.</p>
        ) : (
          <>
            {carrinho.map((item) => (
              <div key={item.id_produto} className="item-bag">
                <p className="produto-nome">{item.nome_produto}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p className="preco-final">R$ {Number(item.preco * item.quantidade).toFixed(2)}</p>
                <button onClick={() => removerItem(item.id_produto)}>Remover</button>
              </div>
            ))}

            <p className="total-bag"><strong>Total:</strong> R$ {Number(total).toFixed(2)}</p>

            <button className="finalizar-btn" onClick={finalizarCompra}>
              Finalizar Pagamento
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CompraJanela;

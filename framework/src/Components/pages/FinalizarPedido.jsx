import React, { useEffect, useState } from 'react';
import "../css/FinalizarPedido.css";
import { useNavigate } from 'react-router-dom';
import usuarioService from "../../service/usuarioService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FinalizarPedido = () => {
  const [carrinho, setCarrinho] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const finalizar = () => {
    const pedido = {
      id_usuario: 1, // Substitua pelo ID real se tiver login implementado
      total: total,
      itens: carrinho.map(item => ({
        id_produto: item.id_produto,
        nome_produto: item.nome_produto,
        quantidade: item.quantidade,
        preco_unitario: item.preco
      }))
    };

    usuarioService.pedido(pedido)
      .then(() => {
        toast.success("Pedido finalizado com sucesso! 🚀");

        setTimeout(() => {
          localStorage.removeItem("carrinho");
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Erro ao finalizar pedido.");
        console.error(err);
      });
  };

  return (
    <div className="pagina-finalizacao">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="finalizacao-titulo">Finalizar Pedido</h2>

      {carrinho.length === 0 ? (
        <p className="mensagem-vazio">Carrinho vazio.</p>
      ) : (
        <>
          <div className="lista-itens">
            {carrinho.map((item) => (
              <div key={item.id_produto} className="item-finalizacao">
                <p className="nome-produto">{item.nome_produto}</p>
                <p className="quantidade">Quantidade: {item.quantidade}</p>
                <p className="subtotal">Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <h3 className="total-pedido">Total: R$ {total.toFixed(2)}</h3>

          <button className="botao-finalizar" onClick={finalizar}>
            Confirmar Pagamento
          </button>
        </>
      )}
    </div>
  );
};

export default FinalizarPedido;

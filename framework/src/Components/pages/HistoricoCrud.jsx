import React, { useEffect, useState } from "react";
import usuarioService from "../../service/usuarioService";
import "../css/HistoricoCrud.css";

const HistoricoCrud = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    usuarioService
      .listarHistorico()
      .then((data) => {
        setHistorico(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao carregar histórico.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando histórico...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="historico-container">
      <h2 className="historico-title">Histórico de Pedidos</h2>

      {historico.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        historico.map((pedido) => (
          <div key={pedido.id} className="pedido-box">
            <h3>Pedido #{pedido.id} - {pedido.nome_usuario}</h3>
            <p>Total: R$ {Number(pedido.total).toFixed(2)}</p>
            <p>Data: {new Date(pedido.data_pedido).toLocaleString('pt-BR')}</p>

            <table className="itens-tabela">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Preço Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.itens.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome_produto}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {Number(item.preco_unitario).toFixed(2)}</td>
                    <td>R$ {Number(item.preco_unitario * item.quantidade).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoricoCrud;

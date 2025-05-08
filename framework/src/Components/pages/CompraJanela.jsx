import React from 'react';
import "../css/CompraJanela.css";

const CompraJanela = ({ produto, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <i className="fa-solid fa-xmark fechar-icon" onClick={onClose}></i>
      <h4 className='title-bag'>Sua sacola</h4>
      <p className='description-bag'><strong>Produto:</strong> {produto.nome}</p>
      <p className='description-bag'><strong>Quantidade:</strong> {produto.volume}</p>
      <p className='description-bag'><strong>Preço:</strong> {produto.preco}</p>
    </div>
  </div>
  );
};

export default CompraJanela;

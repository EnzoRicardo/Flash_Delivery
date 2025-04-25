import React, { useState } from "react";
import { toast } from 'react-toastify'; 
import './ProdutoCrud.css';
const ProdutoCrud = () => {
  const [productData, setProductData] = useState({
    id_produto: '',
    nome_produto: '',
    preco: '',
    qtda_estoque: '',
    fk_id_categoria: '' 
  });

  const handleProductInputChange = (e) => {
    const { id, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();     

    try {
      const response = await fetch('http://localhost:8080/api/admin-produto', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_produto: parseInt(productData.id_produto, 10),
            nome_produto: productData.nome_produto,
            preco: parseFloat(productData.preco),
            qtda_estoque: parseInt(productData.qtda_estoque, 10),
            fk_id_categoria: parseInt(productData.fk_id_categoria, 10) 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Produto adicionado com sucesso!');
        setProductData({ id_produto: '', nome_produto: '', preco: '', qtda_estoque: '', fk_id_categoria: '' });
      } else {
        toast.error(result.error || 'Erro ao adicionar produto.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro de rede ou servidor indisponível.');
    }
  };


  return (
    <div>
      <form onSubmit={handleProductSubmit}>
        <label htmlFor="id_produto">ID Produto:</label>
        <input type="number" id="id_produto" className="label-crud" value={productData.id_produto} onChange={handleProductInputChange} />

        <label htmlFor="nome_produto">Nome Produto:</label>
        <input type="text" id="nome_produto" value={productData.nome_produto} onChange={handleProductInputChange} />

        <label htmlFor="preco">Preço:</label>
        <input type="number" step="0.01" id="preco" value={productData.preco} onChange={handleProductInputChange} />

        <label htmlFor="qtda_estoque">Estoque:</label>
        <input type="number" id="qtda_estoque" value={productData.qtda_estoque} onChange={handleProductInputChange} />

        <label htmlFor="fk_id_categoria">ID Categoria:</label>
        <input type="number" id="fk_id_categoria" value={productData.fk_id_categoria} onChange={handleProductInputChange} />


        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default ProdutoCrud;
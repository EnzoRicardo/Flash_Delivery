import React, { useState } from "react";
import { toast } from 'react-toastify';
import './CategoriaCrud.css';

const CategoriaCrud = () => {
  const [productData, setProductData] = useState({
    id_categoria: '',
    nome_categoria: ''
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
      const response = await fetch('http://localhost:8080/api/admin-categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Explicitly accept JSON response
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            // Ensure IDs are numbers if required by backend, handle potential NaN
            id_categoria: parseInt(productData.id_categoria, 10) || 0, // Or handle invalid input better
            nome_categoria: productData.nome_categoria
        }),
      });

      // Check content type before parsing
      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        // Only parse JSON if response is OK and content type is correct
        const result = await response.json();
        toast.success(result.message || 'Categoria adicionada com sucesso!');
        setProductData({ id_categoria: '', nome_categoria: '' });
      } else if (!response.ok && contentType && contentType.includes("application/json")) {
         // If response is not OK, but is JSON, parse the error
         const result = await response.json();
         toast.error(result.error || `Erro ${response.status} ao adicionar categoria.`);
      } else {
        // Handle non-JSON responses (like HTML error pages)
        const textResponse = await response.text();
        console.error("Received non-JSON response:", textResponse);
        toast.error(`Erro ${response.status}: Resposta inesperada do servidor.`);
      }
    } catch (error) {
      // Catch network errors or errors during fetch/parsing
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro de rede ou falha ao contactar o servidor.');
    }
  }

  return (
    <div>
      <form onSubmit={handleProductSubmit}>
        <label htmlFor="id_categoria">ID Categoria:</label>
        <input type="number" id="id_categoria" className="label-crud" value={productData.id_categoria} onChange={handleProductInputChange} required />

        <label htmlFor="nome_categoria">Nome Categoria:</label>
        <input type="text" id="nome_categoria" className="label-crud" value={productData.nome_categoria} onChange={handleProductInputChange} required />

        <button type="submit">Adicionar Categoria</button>
      </form>
    </div>
  );
};

export default CategoriaCrud;


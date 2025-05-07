import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "./ProdutoCrud.css";

const ProdutoCrud = () => {
  const [categorias, setCategorias] = useState([]);

  const [productData, setProductData] = useState({
    nome_produto: "",
    preco: "",
    qtda_estoque: "",
    fk_id_categoria: "",
  });

  const handleProductInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/admin-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_produto: productData.nome_produto,
          preco: parseFloat(productData.preco),
          qtda_estoque: parseInt(productData.qtda_estoque, 10),
          fk_id_categoria: parseInt(productData.fk_id_categoria, 10),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Produto adicionado com sucesso!");
        setProductData({
          nome_produto: "",
          preco: "",
          qtda_estoque: "",
          fk_id_categoria: "",
        });
      } else {
        toast.error(result.error || "Erro ao adicionar produto.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro de rede ou servidor indisponível.");
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin-categoria");
        const data = await res.json();
        setCategorias(data); // certifique-se que o backend tá retornando um array de objetos tipo { id_categoria, nome_categoria }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast.error("Não foi possível carregar as categorias.");
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div>
      <form onSubmit={handleProductSubmit}>
        <label htmlFor="nome_produto">Nome Produto:</label>
        <input
          type="text"
          id="nome_produto"
          value={productData.nome_produto}
          onChange={handleProductInputChange}
        />

        <label htmlFor="preco">Preço:</label>
        <input
          type="number"
          step="0.01"
          id="preco"
          value={productData.preco}
          onChange={handleProductInputChange}
        />

        <label htmlFor="qtda_estoque">Estoque:</label>
        <input
          type="number"
          id="qtda_estoque"
          value={productData.qtda_estoque}
          onChange={handleProductInputChange}
        />

        <label htmlFor="fk_id_categoria">Categoria:</label>
        <select
          id="fk_id_categoria"
          value={productData.fk_id_categoria}
          onChange={handleProductInputChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.nome_categoria}
            </option>
          ))}
        </select>

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default ProdutoCrud;

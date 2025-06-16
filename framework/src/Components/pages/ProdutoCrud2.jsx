import React, { useState, useEffect } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrudProd = () => {
  const [formInput, setFormInput] = useState({
    nome_produto: "",
    preco: "",
    volume: "",
    estoque: "",
    categoria: "",
    imagem: null,
  });

  const [imagemPreview, setImagemPreview] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [formError, setFormError] = useState({});

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    
    usuarioService
      .produto(formInput)
      .then(() => {
        toast.success("Produto registrado com sucesso!");
        setFormInput({
          nome_produto: "",
          preco: "",
          volume: "",
          estoque: "",
          categoria: "",
          imagem: null,
        });
      })

      .catch((err) => {
        toast.error("Erro ao registrar produto.");
        console.error(err);
      });
  };

  useEffect(() => {
    buscarCategorias();
    buscarProdutos();
  }, []);

  const buscarCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categoria");
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Não foi possível carregar as categorias.");
    }
  };

  const buscarProdutos = () => {
    fetch("http://localhost:8080/api/produtoslist")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        toast.error("Erro ao carregar produtos");
      });
  };

  const deletarProduto = (id) => {
    fetch(`http://localhost:8080/api/produtos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Produto excluído com sucesso!");
          buscarProdutos(); 
        } else {
          toast.error("Erro ao excluir usuário");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        toast.error("Erro ao excluir usuário");
      });
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Adicionar Produto</h2>
        <form className="crud-form" onSubmit={validateFormInput}>
          <label htmlFor="nome_produto">Nome do Produto</label>
          <input
            name="nome_produto"
            type="text"
            value={formInput.nome_produto}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="preco">Preço</label>
          <input
            name="preco"
            type="number"
            value={formInput.preco}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />
          <p className="error-msg">{formError.preco}</p>

          <label htmlFor="volume">Volume</label>
          <input
            name="volume"
            type="text"
            value={formInput.volume}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />
          <p className="error-msg">{formError.volume}</p>

          <label htmlFor="estoque">Estoque</label>
          <input
            name="estoque"
            type="number"
            value={formInput.estoque}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />
          <p className="error-msg">{formError.estoque}</p>

          <label htmlFor="fk_id_categoria">Categoria:</label>
          <select
            name="categoria"
            value={formInput.categoria}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nome_categoria}
              </option>
            ))}
          </select>
          <p className="error-msg">{formError.categoria}</p>

          <label htmlFor="imagem">Imagem</label>
          <input
            type="file"
            accept="image/*"
            name="imagem"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormInput({ ...formInput, imagem: file });
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagemPreview(reader.result);
                reader.readAsDataURL(file);
              } else {
                setImagemPreview(null);
              }
            }}
          />

          {imagemPreview && (
            <div className="preview-container">
              <img src={imagemPreview} alt="Pré-visualização" className="imagem-preview" />
            </div>
          )}

          <button type="submit" className="add-button">Registrar</button>
        </form>

        <div className="usuario-tabela-container">
          <h3 className="usuario-lista-titulo">Produtos cadastrados</h3>
          <table className="usuario-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>VOLUME</th>
                <th>PREÇO</th>
                <th>ESTOQUE</th>
                <th>CATEGORIA</th>
                <th>IMAGEM</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => {
                // Busca o nome da categoria pelo id
                const categoriaObj = categorias.find(
                  (cat) => cat.id_categoria === produto.fk_id_categoria
                );
                return (
                  <tr key={produto.id_produto}>
                    <td>{produto.id_produto}</td>
                    <td>{produto.nome_produto}</td>
                    <td>{produto.volume}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.qtda_estoque}</td>
                    <td>
                      {categoriaObj ? categoriaObj.nome_categoria : "Desconhecida"}
                    </td>
                    <td>
                      {produto.imagem ? (
                        <img
                          src={produto.imagem}
                          alt={produto.nome_produto}
                          className="imagem-miniatura"
                        />
                      ) : (
                        "Sem imagem"
                      )}
                    </td>
                    <td>
                      <button
                        className="botao-excluir"
                        onClick={() => deletarProduto(produto.id_produto)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CrudProd;

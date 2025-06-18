import React, { useState, useEffect } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrudProd = () => {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [formError, setFormError] = useState({});

  const [formInput, setFormInput] = useState({
    nome_produto: "",
    preco: "",
    volume: "",
    estoque: "",
    categoria: "",
    imagem: null,
  });

  const [formEdicao, setFormEdicao] = useState({
    nome_produto: "",
    preco: "",
    volume: "",
    qtda_estoque: "",
    fk_id_categoria: "",
  });

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    const formData = new FormData();
    formData.append("nome_produto", formInput.nome_produto);
    formData.append("preco", formInput.preco);
    formData.append("volume", formInput.volume);
    formData.append("qtda_estoque", formInput.estoque);
    formData.append("fk_id_categoria", formInput.categoria);
    formData.append("imagem", formInput.imagem);

    usuarioService
      .produto(formData)
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
        setImagemPreview(null);
        buscarProdutos();
      })
      .catch((err) => {
        toast.error("Erro ao registrar produto.");
        console.error(err);
      });
  };

  const atualizarProduto = () => {
    fetch(
      `http://localhost:8080/api/produtos/${produtoSelecionado.id_produto}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEdicao),
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Produto atualizado com sucesso!");
          buscarProdutos();
          setModalAberto(false);
        } else {
          toast.error("Erro ao atualizar produto.");
        }
      })
      .catch((err) => {
        console.error("Erro ao atualizar produto:", err);
        toast.error("Erro na requisição.");
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

  const openModal = (produto) => {
    setProdutoSelecionado(produto);
    setFormEdicao({
      nome_produto: produto.nome_produto,
      preco: produto.preco,
      volume: produto.volume,
      qtda_estoque: produto.qtda_estoque,
      fk_id_categoria: produto.fk_id_categoria,
    });
    setModalAberto(true);
  };

  const closeModal = () => {
    setModalAberto(false);
    setProdutoSelecionado(null);
  };

  return (
    <>
      <ToastContainer />
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

          <label htmlFor="categoria">Categoria:</label>
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
              <img
                src={imagemPreview}
                alt="Pré-visualização"
                className="imagem-preview"
              />
            </div>
          )}

          <button type="submit" className="add-button">
            Registrar
          </button>
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
                      {categoriaObj
                        ? categoriaObj.nome_categoria
                        : "Desconhecida"}
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
                      <div className="buttons">
                      <button
                        className="botao-editar"
                        onClick={() => openModal(produto)}
                      >
                        Editar
                      </button>
                        <button
                        className="botao-excluir"
                        onClick={() => deletarProduto(produto.id_produto)}
                      >
                        Excluir
                      </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2 className="form-title">Editar Produto</h2>
              <form className="crud-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  atualizarProduto();
                }}
              >
                <label>Nome do Produto</label>
                <input
                  type="text"
                  value={formEdicao.nome_produto}
                  onChange={(e) =>
                    setFormEdicao({
                      ...formEdicao,
                      nome_produto: e.target.value,
                    })
                  }
                  required
                />

                <label>Preço</label>
                <input
                  type="number"
                  value={formEdicao.preco}
                  onChange={(e) =>
                    setFormEdicao({ ...formEdicao, preco: e.target.value })
                  }
                  required
                />

                <label>Volume</label>
                <input
                  type="text"
                  value={formEdicao.volume}
                  onChange={(e) =>
                    setFormEdicao({ ...formEdicao, volume: e.target.value })
                  }
                  required
                />

                <label>Estoque</label>
                <input
                  type="number"
                  value={formEdicao.qtda_estoque}
                  onChange={(e) =>
                    setFormEdicao({
                      ...formEdicao,
                      qtda_estoque: e.target.value,
                    })
                  }
                  required
                />

                <label>Categoria</label>
                <select
                  value={formEdicao.fk_id_categoria}
                  onChange={(e) =>
                    setFormEdicao({
                      ...formEdicao,
                      fk_id_categoria: e.target.value,
                    })
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

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="botao-fechar"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="botao-salvar">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CrudProd;

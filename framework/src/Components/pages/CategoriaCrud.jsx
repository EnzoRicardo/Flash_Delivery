import "../css/ProdutoCrud2.css";
import "../css/CategoriaCrud.css";
import React, { useState, useEffect } from "react";
import usuarioService from "../../service/usuarioService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriaCrud = () => {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [formError, setFormError] = useState({});

  const [formInput, setFormInput] = useState({
    nome_categoria: "",
    imagem: null,
  });

  const [formEdicao, setFormEdicao] = useState({
    nome_categoria: "",
    imagem: null,
  });

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    // Enviar os dados para o backend
    usuarioService
      .categoria(formInput)
      .then(() => {
        toast.success("Categoria registrada com sucesso!");
        buscarCategorias(); // atualiza a lista
      })
      .catch((err) => {
        toast.error("Erro ao registrar categoria.");
        console.error(err);
      });
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  const buscarCategorias = () => {
    fetch("http://localhost:8080/api/categorialist") // <--- corrigido aqui
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao carregar categorias");
      });
  };

  const deletarCategoria = (id) => {
    fetch(`http://localhost:8080/api/categorias/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Categoria excluída com sucesso!");
          buscarCategorias(); // Atualiza a lista
        } else {
          toast.error("Erro ao excluir categoria");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        toast.error("Erro ao excluir categoria");
      });
  };

  const openModal = (categoria) => {
    setCategoriaSelecionada(categoria);
    setFormEdicao({
      nome_categoria: categoria.nome_categoria,
    });
    setModalAberto(true);
  };

  const closeModal = () => {
    setModalAberto(false);
    setCategoriaSelecionada(null);
  };

  const atualizarCategoria = () => {
  const formData = new FormData();
  formData.append("nome_categoria", formEdicao.nome_categoria);
  if (formEdicao.imagem) {
    formData.append("imagem", formEdicao.imagem);
  }

  fetch(
    `http://localhost:8080/api/categoria/${categoriaSelecionada.id_categoria}`,
    {
      method: "PUT",
      body: formData,
    }
  )
    .then((res) => {
      if (res.ok) {
        toast.success("Categoria atualizada com sucesso!");
        buscarCategorias();
        setModalAberto(false);
      } else {
        toast.error("Erro ao atualizar categoria.");
        console.error("Erro ao atualizar categoria:", res.statusText);
      }
    })
    .catch((err) => {
      console.error("Erro ao atualizar categoria:", err);
      toast.error("Erro na requisição.");
    });
};

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Adicionar Categoria</h2>
        <form className="crud-form" onSubmit={validateFormInput}>
          <label htmlFor="nome_categoria">Nome da Categoria</label>
          <input
            name="nome_categoria"
            type="text"
            value={formInput.nome_categoria}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

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
          <h3 className="usuario-lista-titulo">Categorias cadastradas</h3>
          <table className="usuario-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nome_categoria}</td>
                  <td>
                    {categoria.imagem ? (
                      <img
                        src={categoria.imagem}
                        alt={categoria.nome_categoria}
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
                        onClick={() => openModal(categoria)}
                      >
                        Editar
                      </button>
                      <button
                        className="botao-excluir"
                        onClick={() => deletarCategoria(categoria.id_categoria)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2 className="form-title">Editar Categoria</h2>
              <form
                className="crud-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  atualizarCategoria();
                }}
              >
                <label htmlFor="nome_categoria">Nome da Categoria</label>
                <input
                  type="text"
                  value={formEdicao.nome_categoria}
                  onChange={(e) =>
                    setFormEdicao({
                      ...formEdicao,
                      nome_categoria: e.target.value,
                    })
                  }
                  required
                />

                <label htmlFor="imagem">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormEdicao({ ...formEdicao, imagem: file });
                  }}
                />

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

        <ToastContainer />
      </div>
    </>
  );
};

export default CategoriaCrud;

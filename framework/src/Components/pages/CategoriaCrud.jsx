import "../css/ProdutoCrud2.css";
import "../css/CategoriaCrud.css";
import React, { useState, useEffect } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriaCrud = () => {
  const [formInput, setFormInput] = useState({
    nome_categoria: "",
    imagem: null
  });

  const [imagemPreview, setImagemPreview] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [formError, setFormError] = useState({});

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
        toast.success("Categoria registrado com sucesso!");
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
    fetch("http://localhost:8080/api/categoria")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao carregar categorias");
      });
  };

  const deletarCategoria = (id) => {
    fetch(`http://localhost:8080/api/categorias/${id}`, {
      method: "DELETE"
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
              <img src={imagemPreview} alt="Pré-visualização" className="imagem-preview" />
            </div>
          )}

          <button type="submit" className="add-button">Registrar</button>
        </form>

        <div className="categoria-tabela-container">
          <h3 className="categoria-lista-titulo">Categorias cadastradas</h3>
          <table className="categoria-tabela">
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
                    <button
                      className="botao-excluir"
                      onClick={() => deletarCategoria(categoria.id_categoria)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoriaCrud;

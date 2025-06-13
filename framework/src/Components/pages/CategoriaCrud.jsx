import "../css/ProdutoCrud2.css";
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
      </div>
    </>
  );
};

export default CategoriaCrud;

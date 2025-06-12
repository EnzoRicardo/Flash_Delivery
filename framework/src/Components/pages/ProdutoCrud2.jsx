import "../css/SignUp.css";
import React, { useState } from "react";
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
    imagem: null
  });

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
      .produto(formInput)
      .then(() => {
        toast.success("Produto registrado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao registrar produto.");
        console.error(err);
      });
  };

  return (
    <>
      <div className="login-box">

        <div className="input-box">
          <form onSubmit={validateFormInput}>
            <div className="modal-content">
              <input
                value={formInput.nome_produto}
                onChange={({ target }) => 
                    setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="nome_produto"
                type="text"
                placeholder="nome produto"
                className="input-field"
                required
              />

              <input
                value={formInput.preco}
                onChange={({ target }) => 
                    setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="preco"
                type="number"
                placeholder="preco"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.preco}</p>

              <div className="group-content">

              <input
                value={formInput.volume}
                onChange={({ target }) => 
                    setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="volume"
                type="text"
                placeholder="volume"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.volume}</p>

            
              <input
                value={formInput.estoque}
                onChange={({ target }) => 
                    setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="estoque"
                type="number"
                placeholder="estoque"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.estoque}</p>
              </div>

              <input
                value={formInput.categoria}
                onChange={({ target }) => 
                    setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="categoria"
                type="number"
                placeholder="categoria"
                className="input-field"
                required
              />
              <p className="error-msg">{formError.categoria}</p>

              <input
                type="file"
                accept="image/*"
                name="imagem"
                onChange={(e) => setFormInput({ ...formInput, imagem: e.target.files[0] })}
                className="input-field"
              />
              
              <div className="input-submit">
                <button className="button-login" type="submit">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrudProd;

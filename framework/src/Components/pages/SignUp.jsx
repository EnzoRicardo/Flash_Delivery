import "../css/SignUp.css";
import blob17 from "../../assets/Figura 17.svg";
import blob18 from "../../assets/Figura 18.svg";
import React, { useState } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirm, setMostrarSenhaConfirm] = useState(false);

  const [formInput, setFormInput] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    complemento: "",
    endereco: "",
    senha: "",
    senhaConfirm: "",
  });

  const [formError, setFormError] = useState({});

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (formInput.senha !== formInput.senhaConfirm) {
      errors.senhaConfirm = "As senhas não coincidem.";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    // Enviar os dados para o backend
    usuarioService
      .salvar(formInput)
      .then(() => {
        toast.success("Usuário registrado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao registrar usuário.");
        console.error(err);
      });
  };

  return (
    <>
      <div className="login-box">
        <img src={blob17} className="blob17" alt="Decorativo 17" />
        <img src={blob18} className="blob18" alt="Decorativo 18" />

        <div className="login-header">
          <h2>
            Registre-se <span className="red">aqui!</span>
          </h2>
        </div>

        <div className="input-box">
          <form onSubmit={validateFormInput}>
            <div className="modal-content">
              <input
                value={formInput.nome}
                onChange={({ target }) => {}}
                name="nome"
                type="text"
                placeholder="Nome"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.email}</p>
              <input
                value={formInput.email}
                onChange={({ target }) => {}}
                name="email"
                type="text"
                placeholder="Email"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.email}</p>

              <div className="group-content">

              <input
                value={formInput.cpf}
                onChange={({ target }) => {}}
                name="cpf"
                type="text"
                placeholder="CPF"
                maxLength="{14}"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.cpf}</p>

            
              <input
                value={formInput.telefone}
                onChange={({ target }) => {}}
                name="telefone"
                type="text"
                placeholder="Telefone"
                maxLength={14}
                className="input-field"
                required
              />

              <p className="error-msg">{formError.telefone}</p>
              </div>

              <div className="group-content">
                <input
                value={formInput.cep}
                onChange={({ target }) => {}}
                name="cep"
                type="text"
                placeholder="CEP"
                maxLength={9}
                className="input-field"
                required
              />

              <p className="error-msg">{formError.cep}</p>

              <input
                value={formInput.complemento}
                onChange={({ target }) => {}}
                name="complemento"
                type="text"
                placeholder="Complemento"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.complemento}</p>
              
              </div>

              <input
                value={formInput.endereco}
                onChange={({ target }) => {}}
                name="endereco"
                type="text"
                placeholder="Endereço"
                className="input-field"
                required
              />
              <p className="error-msg">{formError.endereco}</p>

              <div className="senha-input">
              <input
                value={formInput.senha}
                onChange={({ target }) => {}}
                name="senha"
                type="text"
                placeholder="Insira sua senha"
                className="input-field"
                required
              />
              <p className="error-msg">{formError.senha}</p>
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="botao-visibilidade"
                >
                  <i
                    className={`fa-solid ${
                      mostrarSenha ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              <div className="senha-input">
                 <input
                value={formInput.senhaConfirm}
                onChange={({ target }) => {}}
                name="senhaConfirm"
                type="text"
                placeholder="Insira sua senha novamente"
                className="input-field"
                required
              />
              <p className="error-msg">{formError.senhaConfirm}</p>
                <button
                  type="button"
                  onClick={() => setMostrarSenhaConfirm(!mostrarSenhaConfirm)}
                  className="botao-visibilidade-confirm"
                >
                  <i
                    className={`fa-solid ${
                      mostrarSenhaConfirm ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
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

export default SignUp;

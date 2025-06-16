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
  const navigate = useNavigate();

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11);
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

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

    usuarioService
      .salvar(formInput)
      .then(() => {
        toast.success("Usuário registrado com sucesso! Redirecionando...", {
          autoClose: 2500,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2500);
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
                onChange={({ target }) =>
                  setFormInput({ ...formInput, [target.name]: target.value })
                }
                name="nome"
                type="text"
                placeholder="Nome"
                className="input-field"
                required
              />

              <p className="error-msg">{formError.email}</p>
              <input
                value={formInput.email}
                onChange={({ target }) =>
                  setFormInput({ ...formInput, [target.name]: target.value })
                }
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
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: formatCPF(target.value) })
                  }
                  name="cpf"
                  type="text"
                  placeholder="CPF"
                  maxLength={14}
                  className="input-field"
                  required
                />

                <p className="error-msg">{formError.cpf}</p>

                <input
                  value={formInput.telefone}
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: formatPhone(target.value) })
                  }
                  name="telefone"
                  type="text"
                  placeholder="Telefone"
                  maxLength={15}
                  className="input-field"
                  required
                />

                <p className="error-msg">{formError.telefone}</p>
              </div>

              <div className="group-content">
                <input
                  value={formInput.cep}
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: formatCEP(target.value) })
                  }
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
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: target.value })
                  }
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
                onChange={({ target }) =>
                  setFormInput({ ...formInput, [target.name]: target.value })
                }
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
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: target.value })
                  }
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Insira sua senha"
                  className="input-field"
                  required
                />
                <p className="error-msg">{formError.senha}</p>
              </div>

              <div className="senha-input">
                <input
                  value={formInput.senhaConfirm}
                  onChange={({ target }) =>
                    setFormInput({ ...formInput, [target.name]: target.value })
                  }
                  name="senhaConfirm"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Insira sua senha novamente"
                  className="input-field"
                  required
                />
                <p className="error-msg">{formError.senhaConfirm}</p>

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

              <div className="input-submit">
                <button className="button-login" type="submit">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SignUp;

import "../css/Register.css";
import blob14 from "../../assets/Figura 14.svg";
import blob17 from "../../assets/Figura 17.svg";
import blob18 from "../../assets/Figura 18.svg";
import React, { useState } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC<{}> = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const salvar = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await usuarioService.salvar({ nome, email, senha });

      toast.success("✅ Conta criada com sucesso! Redirecionando...", {
        className: "custom-toast-success",
        progressClassName: "custom-toast-progress",
        autoClose: 2500,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error("❌ Erro ao criar a conta. Tente novamente!", {
        className: "custom-toast-error",
        progressClassName: "custom-toast-progress",
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Erro no registro:", error);
    }
  };

  return (
    <>
      <div className="login-box">
        <img src={blob14} className="blob14" />
        <img src={blob17} className="blob17" />
        <img src={blob18} className="blob18" />

        <div className="login-header">
          <h2>
            Registre-se <span className="red">aqui!</span>
          </h2>
        </div>

        <div className="input-box">
          <form onSubmit={salvar}>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input-field"
                required
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

export default Register;

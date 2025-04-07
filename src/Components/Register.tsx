import "./Register.css"
import blob14 from "../assets/Figura 14.svg"
import blob17 from "../assets/Figura 17.svg"
import blob18 from "../assets/Figura 18.svg"
import React, { useEffect, useState } from "react";
import usuarioService from "../service/usuarioService";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Register : React.FC<{}> = ({ }) => {
   
  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const navigate = useNavigate();

  const salvar = async () => {
    try {
      await usuarioService.salvar({ nome, email, senha });
      
      toast.success("Tudo certo por aqui! Vamos te levar ao cardápio 🥂", {
        className: "customToast",
        progressClassName: "custom-toast-progress", 
        autoClose: 2900,
        position: "bottom-center",
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao criar a conta :(")
      console.error("Erro no registro:", error);
    }
  }



  return (
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
              id="nome"
              value={nome}
              className="input-field"
              onChange={(e) => setNome(e.target.value)}
              autoComplete="off"
              required
            />

            <input
              type="text"
              placeholder="E-mail"
              id="email"
              value={email}
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />

            <input
              type="password"
              id="senha"
              placeholder="Senha"
              value={senha}
              className="input-field"
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="off"
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

      <ToastContainer />
    </div>
  );
};

export default Register;
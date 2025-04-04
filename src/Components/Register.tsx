import "./Register.css"
import blob14 from "../assets/Figura 14.svg"
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
        navigate("/order");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao criar a conta :(")
      console.error("Erro no registro:", error);
    }
  }



  return (
    <div className="profile-wrapper">
      <div className="form-container">

              <img src={blob14} className="blob14" />

              <h2>Registre-se <span className="yellow-register">aqui!</span> </h2>

              <div className="field">
                <input type="text" className="form-control" id="nome" aria-describedby="nome" placeholder="Nome"
                    onChange={(e) => { setNome(e.target.value) }}/>
              </div>

              <div className="field">
                <input type="text" className="form-control" id="email" aria-describedby="email" placeholder="E-mail"
                    onChange={(e) => { setEmail(e.target.value) }} />
              </div>

              <div className="field">
                <input type="password" className="form-control" id="senha" aria-describedby="senha" placeholder="Senha"
                    onChange={(e) => { setSenha(e.target.value) }}/>
              </div>

              <div className="button-container">
                <button type="button" className="button-register"
                    onClick={salvar}>registrar
                </button>
              </div>
      </div>
    </div>
  );
};

export default Register;
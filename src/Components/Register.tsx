import "./Register.css"
import blob14 from "../assets/Figura 14.svg"
import React, { useEffect, useState } from "react";
import usuarioService from "../service/usuarioService";



const Register : React.FC<{}> = ({ }) => {
   
  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  const salvar = () => {
    usuarioService.salvar({
      nome: nome,
      email: email,
      senha: senha
    })
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
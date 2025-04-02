import React from 'react'
import "./Register.css"
import blob14 from "../assets/Figura 14.svg"



const Register = () => {
   
    const cadastrarU = async () => {
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const nome = document.getElementById('nome').value;
    };

  return (
    <div className="profile-wrapper">
            <div className="user-icon">
                <h2>Faça aqui seu <span className="red">cadastro!</span></h2>
            </div>

            <div className="modal-overlay">
                <div className="register-content">
                    <input type="text" placeholder="Nome"  id='nome'/>
                    <input type="email" placeholder="E-mail" id='email' />
                    <input type="password" placeholder="Senha" id='senha' />
                    <input type="password" placeholder="Confirme sua senha" id='confirmarSenha' />
                <div className="button-container">
                    <button className="button-register" onClick={cadastrarU}>
                     Registrar-se
                    </button>
                </div>
            </div>
            </div>

            <img src={blob14} className="blob14" />
    </div>
    
  );
};

export default Register;
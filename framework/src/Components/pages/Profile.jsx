import React, { useState } from "react";
import "../css/Profile.css";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import blob15 from "../../assets/Figura 15.svg";
import blob13 from "../../assets/Figura 13.svg";
import blob16 from "../../assets/Figura 16.svg";
import fotoLogin from "../../assets/fotoLogin.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      const response = await usuarioService.login(email, senha);

      if (response.ok) {
        const {token, nome, id, email: emailUsuario} = response.data;

        //salva os dados do usuario no local storage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", nome);
        localStorage.setItem("userID", id);
        localStorage.setItem("userEmail", emailUsuario);

        toast.success("Login Bem-Sucedido!");

        navigate("/order");
      } else {
        toast.error(response.data.message || "Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      toast.error("Erro inesperado ao fazer login.");
    }
  };

  return (
    <div className="login-container">
      <img src={blob15} className="blob15" alt="Decorativo 15" />
      <img src={blob13} className="blob13" alt="Decorativo 13" />
      <img src={blob16} className="blob16" alt="Decorativo 16" />

      <div className="login-content"> 
        <div className="login-box">
          <img src={fotoLogin} alt="Foto Login" className="fotoLogin" />
        </div>

        <div className="input-box">
          <h3 className="login-text">Faça seu login aqui!</h3>
          <form onSubmit={handleLogin}>
            <div className="modal-content">
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
                <button className="button-login-profile" type="submit">
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

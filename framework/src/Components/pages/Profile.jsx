import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import usuarioService from "../../service/usuarioService";
import { useLocation, useNavigate } from "react-router-dom";
import blob15 from "../../assets/Figura 15.svg";
import blob13 from "../../assets/Figura 13.svg";
import blob16 from "../../assets/Figura 16.svg";
import fotoLogin from "../../assets/fotoLogin.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as jwt_decode from "jwt-decode";

const Profile = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notLogged) {
      toast.warn('Você precisa estar logado para acessar esta categoria.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Preencha todos os campos!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await usuarioService.login(email, senha);

      if (response.ok) {
        const { token } = response.data;
        const decoded = jwt_decode.jwtDecode(token);

        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", decoded.nome);
        localStorage.setItem("userID", decoded.id);
        localStorage.setItem("userEmail", decoded.email);
        localStorage.setItem("isAdmin", decoded.isAdmin);

        toast.success("Login Bem-Sucedido!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/order");
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message || "Email ou senha incorretos", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      toast.error("Erro inesperado ao fazer login.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
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

      <ToastContainer />
    </div>
  );
};

export default Profile;

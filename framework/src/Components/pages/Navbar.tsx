import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo FD.png";
import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(token); // Decodifica o token JWT
        setUser(decodedToken); // Armazena as informações do usuário (exemplo: nome, email)
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      } 
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/profile");
  }

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Flash Delivery" className="logo" />

      <button className="hamburguer">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Início
          </Link>
        </li>
        <li>
          <Link to="/order" className="nav-link">
            Cardápio
          </Link>
        </li>
        <li>
          <Link to="/service" className="nav-link">
            Atendimento
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            Sobre Nós
          </Link>
        </li>
      </ul>

      <div className="social-icons">
        <i className="fa-brands fa-instagram fa-2xs"></i>
        <i className="fa-brands fa-facebook fa-2xs"></i>
        {user ? (
          <>
            <div className="user-info">
              <span>Bem-vindo, {user.nome}</span> 
              <button onClick={handleLogout}>Logout</button> 
            </div>
          </>
        ) : (
          <>
            {showLoginOptions && (
              <div id="loginOption" style={{ display: "block" }}>
                <div className="triangulo"></div>
                <div className="login-options">
                  <Link to="/profile" className="nav-link">
                    Entrar
                  </Link>
                  <Link to="/register" className="nav-link">
                    Cadastre-se
                  </Link>
                </div>
              </div>
            )}
            <button id="loginBtn" onClick={handleLoginClick}>
              <i className="fa-solid fa-circle-user fa-2xl"></i>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo FD.png";
import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import "../css/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const decodedToken = jwt_decode.jwtDecode(token);
          setUser(decodedToken);
          const role = localStorage.getItem("userRole");
          setRole(role);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/profile");
  };

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Flash Delivery" className="logo" />
      </Link>

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

      {role === "admin" && (
        <ul className="admin-links">
          <li>
            <Link to="/crud-usuarios" className="nav-link">
              Usuários
            </Link>
          </li>
          <li>
            <Link to="/crud-produtos" className="nav-link">
              Produtos
            </Link>
          </li>
        </ul>
      )}


      {user && (
        <span className="user-name">Olá, {user.nome.split(" ")[0]}!</span>
      )}

      <div className="social-icons">
        <i className="fa-brands fa-instagram fa-2xs"></i>
        <i className="fa-brands fa-facebook fa-2xs"></i>
        {showLoginOptions && (
          <div id="loginOption" style={{ display: "block" }}>
            <div className="triangulo"></div>
            <div className="login-options">
              {user ? (
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/profile" className="nav-link">
                    Entrar
                  </Link>
                  <Link to="/register" className="nav-link">
                    Cadastre-se
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        <button id="loginBtn" onClick={handleLoginClick}>
          <i className="fa-solid fa-circle-user fa-2xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo FD.png";
import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import "../css/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("userToken");
      const adminFlag = localStorage.getItem("isAdmin") === "true";


      if (token) {
        try {
          const decodedToken = jwt_decode.jwtDecode(token);
          setUser(decodedToken);
          setIsAdmin(adminFlag);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAdmin(false);
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

      <div className="admin-user-group">
        {isAdmin && (
          <>
            <a href="/admin" className="admin-button">Gerenciar Produtos</a>
          </>
        )}

        {user && (
          <span className="user-name">Olá, {user.nome.split(" ")[0]}!</span>
        )}
      </div>

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

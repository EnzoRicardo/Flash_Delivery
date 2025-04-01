import React, { useState } from "react";
import logo from "../assets/Logo FD.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("userToken");
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Flash Delivery" className="logo" />

      <button className="hamburguer">
        <i class="fa-solid fa-bars"></i>
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
          <Link to="/aboutUs" className="nav-link">
            Sobre Nós
          </Link>
        </li>
      </ul>

      <div className="social-icons">
        <i className="fa-brands fa-instagram fa-2xs"></i>
        <i className="fa-brands fa-facebook fa-2xs"></i>
        {showLoginOptions && (
          <div id="loginOption" style={{ display: "block" }}>
            <div className="triangulo"></div>
            <div className="login-options">
              <Link to="/profile" className="nav-link">
                Entrar
              </Link>
              <Link to="/profile" className="nav-link">
                Cadastre-se
              </Link>
            </div>
          </div>
        )}

        <button id="loginBtn" onClick={handleLoginClick}>
          <i class="fa-solid fa-circle-user fa-2xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

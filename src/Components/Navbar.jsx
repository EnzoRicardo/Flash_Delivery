import React, { useState } from "react";
import logo from "../assets/Logo FD.png"
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
      <ul>
        <li> 
          <Link to="/" className="nav-link">Início</Link>
        </li>
        <li>
          <Link to="/order" className="nav-link">Cardápio</Link>
        </li>
        <li>
          <Link to="/service" className="nav-link">Atendimento</Link>
        </li>
        <li>
          <Link to="/about-us" className="nav-link">Sobre Nós</Link>
        </li>
      </ul>

      <div className="social-icons">
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook"></i>
        {showLoginOptions && (
        <div id="loginOption" style={{ display: "block" }}>
          <a href="">Login</a>
          <a href="">Login</a>
        </div>
      )}
        
        <button id="loginBtn" onClick={handleLoginClick}><i className="fa-solid fa-user"></i></button>
        
      </div>
    </nav>
  );
};

export default Navbar;

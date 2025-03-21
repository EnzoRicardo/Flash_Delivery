import React from "react";
import logo from "../assets/Logo FD.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
       <Link to="/">
        <img src={logo} alt="Flash Delivery" className="logo" />
      </Link> 
      <ul>
        <li>Início</li>
        <li>Cardápio</li>
        <li>Atendimento</li>
        <li>Sobre Nós</li>
      </ul>

      <div className="social-icons">
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
      </div>
    </nav>
  );
};

export default Navbar;

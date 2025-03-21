import React from "react";
import logo from "../assets/Logo FD.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <img src={logo} alt="Flash Delivery" className="logo" />
      <ul>
        <li>
          <Link to="/" className="nav-link">Início</Link>
        </li>
        <li className="nav-link">Cardápio</li>
        <li className="nav-link">Atendimento</li>
        <li className="nav-link">Sobre Nós</li>
      </ul>

      <div className="social-icons">
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
      </div>
    </nav>
  );
};

export default Navbar;

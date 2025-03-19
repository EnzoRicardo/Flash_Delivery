import React from "react";
import logo from "../assets/Logo FD.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Flash Delivery" className="logo"/>  
      <ul>
        <li>Início</li>
        <li>Cardápio</li>
        <li>Atendimento</li>
        <li>Sobre Nós</li>
      </ul>
    </nav>
  );
};

export default Navbar;

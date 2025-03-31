import React from "react";
import logo from "../assets/Logo FD.png"
import { Link } from "react-router-dom";



const Navbar = () => {

  const isLoggedIn = localStorage.getItem("userToken");
  return (
    <nav className="navbar">
        <img src={logo} alt="Flash Delivery" className="logo" />

        <button className="hamburguer"><i class="fa-solid fa-bars"></i></button>
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
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
        <Link to="/profile">
          <i class="fa-solid fa-user"></i>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;

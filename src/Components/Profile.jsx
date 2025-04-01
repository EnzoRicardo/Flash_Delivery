import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openLogin = () => {
        setIsLoginOpen(true);
        setIsMenuOpen(false);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
    };

    return (
        <div className="profile-wrapper">
            <div className="user-icon" onClick={toggleMenu}>
                <h2>Clique aqui para <span className="red">logar!</span></h2>
                <i class="fa-solid fa-user"></i>
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <button onClick={openLogin}>Entrar</button>
                    <button onClick={() => console.log("Cadastrar")}>Cadastrar</button>
                </div>
            )}

            {isLoginOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Login</h2>
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <button onClick={() => console.log("Logando...")}>Entrar</button>
                    <button onClick={closeLogin}>Fechar</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profile;

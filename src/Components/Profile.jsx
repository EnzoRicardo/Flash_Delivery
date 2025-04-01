import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="profile-wrapper">
            <div className="user-icon" onClick={toggleMenu}>
                👤 {/* Ícone de usuário */}
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <button onClick={() => console.log("Entrar")}>Entrar</button>
                    <button onClick={() => console.log("Cadastrar")}>Cadastrar</button>
                </div>
            )}
        </div>
    );
};

export default Profile;

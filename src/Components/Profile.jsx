import React, { useState } from "react";
import "./Profile.css";
import loginBlob from "../assets/Figura 13.svg"

const Profile = () => {
    return (
        <div className="profile-wrapper">
            <div className="user-icon">
                <h2>Faça aqui seu <span className="red">login!</span></h2>
            </div>

            {/* O formulário de login agora sempre visível */}
            <div className="modal-overlay">
                <div className="modal-content">
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <div className="button-container">
                        <button className="button-login" onClick={() => console.log("Logando...")}>Entrar</button>
                    </div>
                </div>
            </div>

            <img src={loginBlob} className="blob13" />
        </div>
    );
};

export default Profile;

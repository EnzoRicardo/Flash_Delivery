import React, { useState } from "react";
import "./Profile.css";
import loginBlob from "../assets/Figura 13.svg"
import usuarioService from "../service/usuarioService";
import { useNavigate } from "react-router-dom";

const Profile : React.FC<{}> = ({}) => {

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {

            const response = await usuarioService.login(email, senha);
            if (response.status === 200) {
                alert("Login bem sucedido!");
                navigate("/order");
            }
        } catch (err) {
            setError("Nome ou senha inválidos.");
        }
    }


    return (
        <div className="profile-wrapper">
            <div className="user-icon">
                <h2>Faça aqui seu <span className="red">login!</span></h2>
            </div>

            
            <div className="modal-overlay">
                <form onSubmit={handleLogin}>
                <div className="modal-content">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            />
                    <div className="button-container">
                        <button className="button-login" type="submit">Entrar</button>
                    </div>
                </div>
                </form>
            </div>

            <img src={loginBlob} className="blob13" />
        </div>
    );
};

export default Profile;

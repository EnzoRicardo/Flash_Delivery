import React, { useState } from "react";
import "../css/Profile.css";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import blob15 from "../../assets/Figura 15.svg"
import blob13 from "../../assets/Figura 13.svg"
import blob16 from "../../assets/Figura 16.svg"

const Profile : React.FC<{}> = ({}) => {

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {

            if (!email || !senha) {
                alert("Campos são obrigatórios");
                return;
            }

            const response = await usuarioService.login(email, senha, navigate);
            if (response.status === 200) {
                alert("Login bem sucedido!");
                localStorage.setItem("userToken", response.data.token);
                window.location.replace("/")
            }
            if (response.status === 400) {
                alert("Email ou senha incorretos.")
            }
        } catch (err) {
            setError("Erro ao tentar fazer login.");
        }
    }


    return (
        <div className="login-box">

            <img src={blob15} className="blob15" />
            <img src={blob13} className="blob13" />
            <img src={blob16} className="blob16" />

            <div className="login-header">
                <h2>Faça aqui seu <span className="red">login!</span> </h2>
            </div>

            <div className="input-box">
                    <form onSubmit={handleLogin}>
                        <div className="modal-content">
                            <input 
                               type="text" 
                               placeholder="E-mail"
                               id="email"
                               value={email}
                               className="input-field"
                               onChange={(e) => setEmail(e.target.value)}
                               autoComplete="off"
                               required
                            />

                            <input 
                               type="password" 
                               id="senha"
                               placeholder="Senha"
                               value={senha}
                               className="input-field"
                               onChange={(e) => setSenha(e.target.value)}
                               autoComplete="off"
                               required
                            />

                            <div className="input-submit">
                                <button className="button-login" type="submit">
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>

            </div>
        </div>
    );
};

export default Profile;

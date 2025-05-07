import React from 'react'


    
const salvar = async(usuario:any) => {
return await fetch(`http://localhost:8080/api/usuario`,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(usuario),
    })
}

const login = async (email: string, senha: string, navigate: any) => {
    const response = await fetch(`http://localhost:8080/api/login`, {
        method: "POST", 
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    console.log("Resposta do servidor:", data);

    if (response.ok) {
        console.log("Login bem-sucedido!");
        console.log("Token recebido:", data.token);
        localStorage.setItem("userToken", data.token);
        alert("Login bem-sucedido!");
        navigate("/");
        return data;
    } else {
        console.log("Erro no login:", data.message);
        alert(data.message);
    }
};

const usuarioService = {
    salvar,
    login
};

export default usuarioService;

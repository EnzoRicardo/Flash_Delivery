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

const login = async (nome: string, senha: string) => {
return await fetch(`http://localhost:8080/api/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({nome, senha}),
    })
}

const usuarioService = {
    salvar,
    login
};

export default usuarioService;

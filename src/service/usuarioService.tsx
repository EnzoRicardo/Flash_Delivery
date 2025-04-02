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

const usuarioService = {
    salvar
};

export default usuarioService;

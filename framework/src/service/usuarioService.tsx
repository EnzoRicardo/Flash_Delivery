const salvar = async (usuario: any) => {
  return await fetch(`http://localhost:8080/api/usuario`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
};

const login = async (email: string, senha: string) => {
  const response = await fetch(`http://localhost:8080/api/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data,
    };
  } else {
    const text = await response.text();
    throw new Error("Resposta esperada da API" + text.slice(0, 100));
  }
};

const usuarioService = {
  salvar,
  login,
};

export default usuarioService;

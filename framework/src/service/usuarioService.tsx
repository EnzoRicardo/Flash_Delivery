const salvar = async (usuario: any) => {
  return await fetch(`http://localhost:8080/api/usuario`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
};

const produto = async (produto: any) => {
  const formData = new FormData();

  formData.append("nome_produto", produto.nome_produto);
  formData.append("preco", produto.preco);
  formData.append("volume", produto.volume);
  formData.append("estoque", produto.estoque);
  formData.append("categoria", produto.categoria);

  if (produto.imagem) {
    formData.append("imagem", produto.imagem); // Aqui vai o blob (arquivo)
  }

  return await fetch(`http://localhost:8080/api/produtos`, {
    method: "POST",
    body: formData,
    // ❌ Não inclua Content-Type aqui!
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
  produto
};

export default usuarioService;

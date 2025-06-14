import "../css/ProdutoCrud2.css";
import "../css/CategoriaCrud.css";
import React, { useState, useEffect } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCrud = () => {
  const [formInput, setFormInput] = useState({
    nome: "",
    email: "",
    CPF: "",
    telefone: "",
    complemento: "",
    CEP: "",
    endereco: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [formError, setFormError] = useState({});

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    // Enviar os dados para o backend
    usuarioService
      .usuarios(formInput)
      .then(() => {
        toast.success("Categoria registrado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao registrar categoria.");
        console.error(err);
      });
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
    fetch("http://localhost:8080/api/usuario")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao carregar categorias");
      });
  };

  const deletarUsuario = (id) => {
    fetch(`http://localhost:8080/api/usuario/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Usuario excluída com sucesso!");
          buscarUsuarios(); // Atualiza a lista
        } else {
          toast.error("Erro ao excluir categoria");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        toast.error("Erro ao excluir categoria");
      });
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Adicionar Usuario</h2>
        <form className="crud-form" onSubmit={validateFormInput}>
          <label htmlFor="nome">Nome:</label>
          <input
            name="nome"
            type="text"
            value={formInput.nome}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={formInput.email}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="CPF">CPF</label>
          <input
            name="CPF"
            type="number"
            value={formInput.CPF}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="telefone">Telefone</label>
          <input
            name="telefone"
            type="number"
            maxLength="11"
            value={formInput.telefone}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="complemento">Complemento</label>
          <input
            name="complemento"
            type="text"
            value={formInput.complemento}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="CEP">CEP</label>
          <input
            name="CEP"
            type="number"
            value={formInput.CEP}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <label htmlFor="endereco">Endereco</label>
          <input
            name="endereco"
            type="text"
            value={formInput.endereco}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            required
          />

          <button type="submit" className="add-button">
            Registrar
          </button>
        </form>

        <div className="categoria-tabela-container">
          <h3 className="categoria-lista-titulo">Usuarios cadastradas</h3>
          <table className="categoria-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Complemento</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.CPF}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.complemento}</td>
                  <td>{usuario.CEP}</td>
                  <td>{usuario.endereco}</td>

                  <td>
                    <button
                      className="botao-excluir"
                      onClick={() => deletarUsuario(usuario.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserCrud;

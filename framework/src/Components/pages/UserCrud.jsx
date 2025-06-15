import "../css/SignUp.css";
import "../css/UserCrud.css";
import React, { useEffect, useState } from "react";
import usuarioService from "../../service/usuarioService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCrud = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const [formInput, setFormInput] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    complemento: "",
    endereco: "",
    senha: "",
    senhaConfirm: "",
  });

  const [formError, setFormError] = useState({});

  const validateFormInput = (e) => {
    e.preventDefault();
    const errors = {};

    if (formInput.senha !== formInput.senhaConfirm) {
      errors.senhaConfirm = "As senhas não coincidem.";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    // Enviar os dados para o backend
    usuarioService
      .salvar(formInput)
      .then(() => {
        toast.success("Usuário registrado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao registrar usuário.");
        console.error(err);
      });

      buscarUsuarios(); // Atualiza a lista de usuários
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
    fetch('http://localhost:8080/api/usuariolist')
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        toast.error("Erro ao carregar usuários");
      });
  };

  const deletarUsuario = (id) => {
      fetch(`http://localhost:8080/api/usuario/${id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Usuário excluído com sucesso!");
            buscarUsuarios(); // Atualiza a lista
          } else {
            toast.error("Erro ao excluir usuário");
          }
        })
        .catch((err) => {
          console.error("Erro ao excluir:", err);
          toast.error("Erro ao excluir usuário");
        });
    };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Registre-se aqui!</h2>
        <form className="crud-form" onSubmit={validateFormInput}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            value={formInput.nome}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            name="nome"
            type="text"
            placeholder="Nome"
            className="input-field"
            required
          />

          <p className="error-msg">{formError.email}</p>
          <label htmlFor="email">Email</label>
          <input
            value={formInput.email}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            name="email"
            type="text"
            placeholder="Email"
            className="input-field"
            required
          />

          <p className="error-msg">{formError.email}</p>

          <label htmlFor="CPF">CPF</label>

          <input
            value={formInput.cpf}
            onChange={({ target }) =>
              setFormInput({
                ...formInput,
                [target.name]: formatCPF(target.value),
              })
            }
            name="cpf"
            type="text"
            placeholder="CPF"
            maxLength={14}
            className="input-field"
            required
          />

          <p className="error-msg">{formError.cpf}</p>

          <label htmlFor="telefone">TELEFONE</label>

          <input
            value={formInput.telefone}
            onChange={({ target }) =>
              setFormInput({
                ...formInput,
                [target.name]: formatPhone(target.value),
              })
            }
            name="telefone"
            type="text"
            placeholder="Telefone"
            maxLength={15}
            className="input-field"
            required
          />

          <p className="error-msg">{formError.telefone}</p>
          <label htmlFor="CEP">CEP</label>

          <input
            value={formInput.cep}
            onChange={({ target }) =>
              setFormInput({
                ...formInput,
                [target.name]: formatCEP(target.value),
              })
            }
            name="cep"
            type="text"
            placeholder="CEP"
            maxLength={9}
            className="input-field"
            required
          />

          <p className="error-msg">{formError.cep}</p>
          <label htmlFor="complemento">COMPLEMENTO</label>

          <input
            value={formInput.complemento}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            name="complemento"
            type="text"
            placeholder="Complemento"
            className="input-field"
            required
          />

          <p className="error-msg">{formError.complemento}</p>
          <label htmlFor="endereco">ENDEREÇO</label>

          <input
            value={formInput.endereco}
            onChange={({ target }) =>
              setFormInput({ ...formInput, [target.name]: target.value })
            }
            name="endereco"
            type="text"
            placeholder="Endereço"
            className="input-field"
            required
          />
          <p className="error-msg">{formError.endereco}</p>

          <label htmlFor="senha">SENHA</label>
          <div className="senha-input">
            <input
              value={formInput.senha}
              onChange={({ target }) =>
                setFormInput({ ...formInput, [target.name]: target.value })
              }
              name="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Insira sua senha"
              className="input-field"
              required
            />
            <p className="error-msg">{formError.senha}</p>
          </div>
          <label htmlFor="senha">CONFIRMAR SENHA</label>

          <div className="senha-input">
            <input
              value={formInput.senhaConfirm}
              onChange={({ target }) =>
                setFormInput({ ...formInput, [target.name]: target.value })
              }
              name="senhaConfirm"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Insira sua senha novamente"
              className="input-field"
              required
            />
            <p className="error-msg">{formError.senhaConfirm}</p>

            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="botao-visibilidade"
            >
              <i
                className={`fa-solid ${
                  mostrarSenha ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </button>
          </div>

            <button className="add-button" type="submit">
              Registrar
            </button>
        </form>

        <div className="usuario-tabela-container">
          <h3 className="usuario-lista-titulo">Usuários cadastrados</h3>
          <table className="usuario-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>CPF</th>
                <th>TELEFONE</th>
                <th>CEP</th>
                <th>ENDEREÇO</th>
                <th>COMPLEMENTO</th>
                <th>SENHA</th>
                <th>AÇÕES</th>
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
                  <td>{usuario.CEP}</td>
                  <td>{usuario.endereco}</td>
                  <td>{usuario.complemento}</td>
                  <td>{usuario.senha}</td>
                  <td>
                    <button
                      className="botao-excluir"
                      onClick={() =>
                        deletarUsuario(usuario.id)
                      }
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

DROP DATABASE IF EXISTS flashdelivery;
create database flashdelivery;
use flashdelivery;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
	CPF VARCHAR(11) NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    complemento VARCHAR(11) NOT NULL,
    CEP VARCHAR(8)NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

select * from usuarios;

CREATE TABLE produtos (
	id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(255) NOT NULL,
    preco float NOT NULL,
    qtda_estoque INT NOT NULL,
    fk_id_categoria INT NOT NULL
);

SELECT * FROM produtos;

CREATE TABLE categoria (
	id_categoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome_categoria VARCHAR(255) NOT NULL
);

SELECT * FROM categoria;
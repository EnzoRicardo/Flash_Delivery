DROP DATABASE IF EXISTS flashdelivery;
create database flashdelivery;
use flashdelivery;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
	CPF VARCHAR(14) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    complemento VARCHAR(11) NOT NULL,
    CEP VARCHAR(9)NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (
	nome, email, CPF, telefone, complemento, CEP, endereco, senha
) VALUES (
	'Administrador', 'admin', '000.000.000-00', '00000-0000', 'admin', '00000-000', 'Rua do Admin', 'admin'
);

select * from usuarios;	

CREATE TABLE produtos (
id_produto INT AUTO_INCREMENT PRIMARY KEY,
nome_produto VARCHAR(255) NOT NULL,
volume VARCHAR(255) NOT NULL,
preco float NOT NULL,
qtda_estoque INT NOT NULL,
imagem longblob,
fk_id_categoria INT NOT NULL
);

SELECT * FROM produtos;

CREATE TABLE categoria (
	id_categoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome_categoria VARCHAR(255) NOT NULL,
    imagem longblob
);

SELECT id_categoria, nome_categoria FROM categoria;
SELECT * FROM categoria; 


USE FLASHDELIVERY;
SHOW VARIABLES LIKE 'secure_file_priv';

INSERT INTO usuarios (nome, email, CPF, telefone, complemento, cep, endereco, senha)
VALUES 
('Sarah Maneira', 'sarah@maneira.com', '12345678901', '11987654321', 'Apto 202', '01001000', 'Rua das Flores, 123', '123'),
('Enzo Leitão', 'enzo@leitao.com', '23456789012', '21998765432', 'Casa', '20040010', 'Av. Brasil, 456', '123'),
('Pedro Santos', 'pedro.santos@email.com', '34567890123', '31912345678', 'Bloco B, Apto 101', '30130110', 'Rua Minas Gerais, 789', '123');

select * from usuarios;

INSERT INTO categoria (nome_categoria)
VALUES ('Cervejas'), ('Refrigerantes'), ('Drinks Prontos'), ('Destilados'), ('Vinhos'), ('Água');

select * from categoria;



INSERT INTO produtos (nome_produto, volume, preco,qtda_estoque, imagem_produto, fk_id_categoria)
VALUES 
('Coca-Cola', '350ml', 8.0, 10,'https://images2.imgbox.com/dc/91/gIiMuNKm_o.png', 2);

select * from produtos;
delete FROM produtos where id_produto = '5';


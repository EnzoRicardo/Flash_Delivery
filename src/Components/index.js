const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5500/', 
    credentials: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PUC@1234',
    database: 'flashdelivery'
});


app.post('/api/cadastrarU', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Os campos são obrigatórios.' });
    }

    // Inserir usuário no banco de dados
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ? )', [nome, email, senha], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    });
});
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PUC@1234',
    database: 'flashdelivery'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
    }
});

module.exports = connection;
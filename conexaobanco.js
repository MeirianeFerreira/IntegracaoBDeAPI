const mysql = require('mysql');

// Cria um pool de conexões
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexões no pool
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cadastrohappylife'
});

// Exporta o pool para ser utilizado em outros arquivos do projeto
module.exports = pool;

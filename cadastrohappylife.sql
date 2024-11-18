-- Criação do banco de dados
CREATE DATABASE cadastrohappylife;


-- Criação da tabela `dadoscliente`
CREATE TABLE dadoscliente (
  codcliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  email VARCHAR (80 )UNIQUE NOT NULL,
  whatsapp VARCHAR (20) NOT NULL,
  cep INT (8) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero CHAR(8) NOT NULL,
  complemento VARCHAR(100),
  bairro  CHAR(20) NOT NULL,
  estado CHAR(20) NOT NULL,
  cidade  VARCHAR(50) NOT NULL,
  creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
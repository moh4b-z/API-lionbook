CREATE DATABASE db_lionbook;
USE db_lionbook;

CREATE TABLE tbl_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(45) UNIQUE NOT NULL,
  senha VARCHAR(45) NOT NULL
);

CREATE TABLE tbl_livro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  data_publicacao DATE NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  isbn VARCHAR(150) NOT NULL
);

CREATE TABLE tbl_tipo_movimentacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(100) not null
);

CREATE TABLE tbl_movimentacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_livro INT NOT NULL,
  id_usuario INT NOT NULL,
  id_movimentacao INT NOT NULL,
  quantidade INT NOT NULL CHECK (quantidade > 0),
  data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_livro) REFERENCES tbl_livro(id),
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
  FOREIGN KEY (id_movimentacao) REFERENCES tbl_tipo_movimentacao(id)
);
CREATE DATABASE app_blog; 
 
CREATE TABLE usuario ( 
    id varchar(100) PRIMARY KEY, -- UUID 
    nome varchar(50) DEFAULT NULL, 
    email varchar(50) DEFAULT NULL, 
    senha varchar(100) DEFAULT NULL, 
    dt_cadastro timestamp NOT NULL, 
    ativo boolean NOT NULL 
); 
 
CREATE TABLE postagem ( 
    id varchar(100) PRIMARY KEY, -- UUID 
    titulo varchar(200) NOT NULL, 
    descricao text NOT NULL, 
    dt_cadastro timestamp NOT NULL, 
    ativo boolean NOT NULL, 
    cod_usuario varchar(100) REFERENCES usuario(id) 
); 
 
CREATE TABLE comentario ( 
    id varchar(100) PRIMARY KEY, -- UUID 
    descricao text NOT NULL, 
    dt_cadastro timestamp NOT NULL, 
    ativo boolean NOT NULL, 
    cod_postagem varchar(100) REFERENCES postagem(id), 
    cod_usuario varchar(100) REFERENCES usuario(id) 
); 
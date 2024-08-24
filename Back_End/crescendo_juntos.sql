create database crescendo_juntos;
use crescendo_juntos;

create table escola(
	codigo_escola int primary key auto_increment,
    email varchar(30) NOT NULL,
    senha varchar(30) NOT NULL,
);

create table responsavel(
    id int primary key auto_increment,
	nome varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    senha varchar(30) NOT NULL,
    codigo_escola int,
    foreign key (codigo_escola) references escola(codigo_escola)
);

create table professores(
    id int primary key auto_increment,
	nome varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    senha varchar(30) NOT NULL,
    codigo_escola int,
    foreign key (codigo_escola) references escola(codigo_escola)
);

create table imagem(
	id int primary key auto_increment,
	imagem varchar(255)

);
select * from imagem;
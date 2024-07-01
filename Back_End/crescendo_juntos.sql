create database crescendo_juntos;

create table usuarios(
	id int primary key auto_increment,
    email varchar(30) NOT NULL,
    senha varchar(30) NOT NULL,
    codigo_escola varchar(30) NOT NULL
);
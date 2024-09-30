create database crescendo_juntos;
use crescendo_juntos;

create table escola(
	codigo_escola int primary key auto_increment,
    email varchar(30) NOT NULL,
    senha varchar(30) NOT NULL
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
	imagem varchar(255),
    codigo_escola int,
    foreign key (codigo_escola) references escola(codigo_escola)

);
select * from imagem;

select * from escola;

select * from responsavel;

-- Selecionando a imagem para o mural da escola (para o usuário escola) em que dentro da tabela "escola" e "imagem" ambos os campos "codigo_escola" é o mesmo
SELECT imagem
FROM escola e
INNER JOIN imagem i
ON e.codigo_escola = i.codigo_escola;

-- Selecionando a imagem para o mural da escola (para o usuário responsável) em que dentro da tabela "escola" e "imagem" ambos os campos "codigo_escola" é o mesmo
SELECT imagem
FROM responsavel r
INNER JOIN imagem i
ON r.codigo_escola = i.codigo_escola;

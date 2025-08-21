create database if not exists db_clientes_vitor;

use db_clientes_vitor;

create table tbl_cliente (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    email varchar(30) not null,
    telefone varchar(15) not null
);
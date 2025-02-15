use master
go
drop database if exists pohadjanje_Vrtica;
go
create database pohadjanje_Vrtica collate Croatian_CI_AS;
go
use pohadjanje_Vrtica;
go

create table skupine(
sifra int not null primary key identity(1,1),
naziv varchar(20) not null,
prostorija varchar(20) not null
);

create table tete(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(50) not null,
broj_mobitela varchar(20),
oib char(11)
);

create table podskupine(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
skupina int not null references skupine(sifra),
teta int not null references tete(sifra)
);


create table djeca(
sifra int not null primary key identity(1,1),
podskupina int not null references podskupine(sifra),
ime varchar(20) not null,
prezime varchar(20) not null,
spol bit not null, --0 za muško 1 za žensko
datum_rodjenja date,
kontakt_roditelja varchar (20)
);

--1
insert into skupine (naziv, prostorija) values
('Linići' , 'soba 906')
--2
insert into skupine (naziv, prostorija) values
('Lolići' , 'soba 129');

--1
insert into tete (ime, prezime) values
('Ana Marija' , 'Novak')
--2
insert into tete (ime, prezime) values
('Lara', 'Petrović')
--3
insert into tete (ime, prezime) values
('Ema', 'Vukić')
--4
insert into tete (ime, prezime) values
('Sofija', 'Pavlović')

insert into podskupine (naziv, skupina, teta) values
--1
('Medeki', 1, 1),
--2
('Zečići', 1, 3),
--3
('Anđelčići', 2,2),
--4
('Srčeka', 2,4)

insert into djeca(podskupina, ime, prezime, spol) values
(1,'Ivan', 'Horvat', 0),
(1, 'Noa', 'Kaštelan', 0),
(1, 'Sofija', 'Jurić', 1),
(2, 'Ela', 'Vrančić', 1),
(2, 'Luna', 'Stipanović', 1),
(2, 'Marko', 'Marinković', 0),
(3, 'Nika', 'Kovač', 1),
(3, 'Mia', 'Šarić', 1),
(3, 'Luka', 'Grgić', 0),
(4, 'Vid', 'Bilić', 0),
(4, 'Lea', 'Matić', 1),
(4,'Noa', 'Kovačević', 0);
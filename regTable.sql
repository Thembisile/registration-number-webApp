CREATE TABLE towns(
    id serial not null primary key,
    town_name VARCHAR(50) not null,
    reg VARCHAR not null
);

CREATE TABLE reg(
    id serial not null primary key,
    reg_numbers VARCHAR(13) not null,
    town_id int not null,
    FOREIGN KEY(town_id) references towns(id) ON DELETE CASCADE
);

INSERT INTO towns (town_name, reg) VALUES ('CAPE TOWN', 'CA ');
INSERT INTO towns (town_name, reg) VALUES ('PAARL', 'CJ ');
INSERT INTO towns (town_name, reg) VALUES ('BELVILLE', 'CY '); 
INSERT INTO towns (town_name, reg) VALUES ('WORCESTER', 'CW ');


-- drop table reg;
-- drop table towns;
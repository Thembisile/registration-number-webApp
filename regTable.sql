CREATE TABLE towns(
    id serial not null primary key,
    town_name VARCHAR(50) not null,
    reg VARCHAR not null
);

CREATE TABLE reg(
    id serial not null primary key,
    reg_numbers VARCHAR(13) not null,
    town_id int,
    FOREIGN KEY(town_id) references towns(id)
)
-- drop table reg;
-- SELECT reg.town_id, towns.reg, towns.town_name, reg.reg_numbers FROM towns INNER JOIN reg ON towns.id = reg.town_id;
-- ALTER TABLE table_name
-- RENAME column_name_1 TO new_column_name_1,
-- RENAME column_name_2 TO new_column_name_2,
-- UPDATE towns SET reg = 'CAW' WHERE town_name = 'GEORGE';
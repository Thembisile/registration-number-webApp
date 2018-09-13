CREATE TABLE towns(
    id serial not null primary key,
    town_name VARCHAR(50) not null,
    reg VARCHAR not null
);

CREATE TABLE reg(
    town_id serial not null primary key,
    regnumbers VARCHAR(13) not null,
    reg int,
    FOREIGN KEY(reg) references towns(id)
)
-- drop table towns;
-- drop table reg;
CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;
DROP TABLE department;
CREATE TABLE department (
	ID INT AUTO_INCREMENT NOT NULL,
    name varchar (40) NOT NULL,
    PRIMARY KEY (ID)
);  



INSERT INTO department (name) VALUES ("Administration");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Inventory");
INSERT INTO department (name) VALUES ("Customer Service");

SELECT* FROM department;  

DROP TABLE role;
CREATE TABLE role (
	ID INT  AUTO_INCREMENT NOT NULL,
    title varchar (40) NOT NULL,
    salary decimal NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO role (title, salary, department_id) VALUES ("Son", 20000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Prince", 30000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("King", 40000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Master", 35000, 4);


SELECT* FROM role;

DROP TABLE employee;
CREATE TABLE employee (
	ID INT  AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Son", "Goku", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Prince", "Vegeta", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Son", "Gohan", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Prince", "Trunks", 4, 4);


SELECT* FROM employee;


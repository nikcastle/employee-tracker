
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Palmer", 2, 1), 
("Luke", "Danes", 7, 3),
("Eric", "Forman", 6,3),
("Elizabeth","Bennet",5,4),
("Chandler", "Bing",4,4),
("Linda", "Belcher",3,1);

INSERT INTO department (name)
VALUES ("Human Resources"),
 ("Sales"),
 ("Tech"),
 ("Client Services"),
 ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager",70000.00,4),
("Payroll Manager",75000.00,1),
("Operations Assistant",50000.00,5),
("Sales Representative",60000.00,2),
("Sales Team Lead",85000.00,2),
("Tech Team Lead",100000.00,3),
("Engineer",90000.00,3);
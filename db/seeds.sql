-- Departments Table 
INSERT INTO department (id, name) VALUES
(1, "Sales"),
(2, "Marketing"),
(3, "Research"),
(4, "IT");

-- Roles Table 
INSERT INTO role (id, title, salary, department_id) VALUES
(1, "Intern", 2000, 1),
(2, "Manager", 170000, 2),
(3, "Consultant", 30000, 2),
(4, "Administration", 27000, 4);

-- Employees Table 
INSERT INTO employee (id, first_name,  last_name, role_id,  manager_id) VALUES
(3, "Susan", "Williams", 4, null),
(1, "James", "Thomas", 1,3),
(2, "Jennifer", "Bowers", 2,1),
(4, "Ola", "Johnson", 1,3);




    
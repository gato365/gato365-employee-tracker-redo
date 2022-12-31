-- Departments Table 
INSERT INTO department (id, name) VALUES
(1, "sales"),
(2, "marketing"),
(3, "Research"),
(4, "IT");

-- Roles Table 
INSERT INTO role (id, title, salary, department_id) VALUES
(1, "Intern", 23432, 1),
(2, "Manager", 123432, 2),
(3, "Consultant", 323432, 2),
(4, "Administration", 423432, 4);

-- Employees Table 
INSERT INTO employee (id, first_name,  last_name, role_id,  manager_id) VALUES
(1, "James", "Williams", 1,3),
(2, "Jennifer", "Williams", 2,1),
(3, "Susan", "Williams", 4,2),
(4, "Ola", "Williams", 1,3);




    
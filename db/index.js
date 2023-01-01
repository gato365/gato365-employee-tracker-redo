const connection = require('../config/connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //1. Department
    findAllDepartments() {


        // return this.connection.Promise.query(
        //     "SELECT * from department;");

        return new Promise((resolve) => { // Question 2: Why is there not are reject?
            connection.query("select * from department", function (err, results) {
                resolve(results);
                // console.log(results);
            });
        });


    }
    //2. Role
    findAllRoles() {
        return this.connection.promise.query(
            "SELECT * from role;");

    }
    //3. Employee
    findAllEmployees() {
        return this.connection.promise.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );

    }
    //4. Add Department
    createDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department);
    }

    //5. Add Role
    createRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role);
    }

    //6. Add Employee
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee);
    }

    //7. Update Employee
    updateEmployee(employee,role_id) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`
        );
    }

}

module.exports = DB;
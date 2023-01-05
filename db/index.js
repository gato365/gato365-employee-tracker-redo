const connection = require('../config/connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //1. Department
    findAllDepartments() {

        return new Promise((resolve) => { // Question 2: Why is there not are reject?
            connection.query("select * from department", function (err, results) {
                
                resolve(results);
            });
        });


    }
    //2. Role
    findAllRoles() {


        return new Promise((resolve) => { // Question 2: Why is there not are reject?
            connection.query("select * from role", function (err, results) {
                resolve(results);
            });
        });

    }
    //3. Employee
    findAllEmployees() {



        queryStr1 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        queryStr2 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"

        return new Promise((resolve) => { // Question 2: Why is there not are reject?
            connection.query(queryStr2, function (err, results) {
                resolve(results);
            });
        });



    }
    //4. Add Department
     createDepartment(department) {
        return new Promise((resolve) => {
            connection.query("INSERT INTO department SET ?", department, 
            function (err, results) {
                if(err) throw err
                console.log(results)
                resolve(results);
            });
        }); 
    }

    //5. Add Role
    createRole(role) {
        return new Promise((resolve) => {
            connection.query("INSERT INTO role SET ?", role, 
            function (err, results) {
                if(err) throw err
                console.log(results)
                resolve(results);
            });
        }); 
    }



    //6. Add Employee
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee);
    }

    //7. Update Employee
    updateEmployee(employee, role_id) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`
        );
    }

}

module.exports = DB;
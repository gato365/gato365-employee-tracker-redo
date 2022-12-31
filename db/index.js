

const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }
    
    //1. viewDepartment: Department
    findAllDepartment(){
        return this.connection.promise().query( 
            "SELECT * from department ") ;
        
    }
    //2. viewRole: Role
    findAllRoles(){
        return this.connection.promise().query( 
            "SELECT * from role") ;
        
    }
    //3. viewEmployee
    findAllEmployees(){
        return this.connection.promise().query( 
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"

            
            
            ) ;
        
    }
    //4. addDepartment
    createDepartment(department){
        return this.connection.promise().query( 
            "INSERT INTO department SET ?", department);
    }

    //5. addRole
    createRole(role){
        return this.connection.promise().query( 
            "INSERT * from employee ") ;
    }
    //6. addEmployee
    createEmployee(employee){
        return this.connection.promise().query( 
            "INSERT INTO employee SET ?", employee) ;
    }

}
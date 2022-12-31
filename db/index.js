

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
    findAllRole(){
        return this.connection.promise().query( 
            "SELECT * from role") ;
        
    }
    //3. viewEmployee
    findAllEmployee(){
        return this.connection.promise().query( 
            "SELECT * from employee ") ;
        
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
            "INSERT * from employee ") ;
    }

}
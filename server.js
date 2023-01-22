const { prompt } = require('inquirer');
const DB = require('./db');

// const db = require("./db");

let db = new DB;


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/01/2023
// Date Modified: 01/01/2023
// Name: viewAllDepartments
// Purpose: Displays all departments
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function viewAllDepartments() {
    db.findAllDepartments().then((rows) => {
        let departments = rows;
        console.table(departments)
    }).then(() => mainPrompt())



}

// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/01/2023
// Date Modified: 01/01/2023
// Name: viewAllRoles
// Purpose: Displays all roles
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function viewAllRoles() {
    db.findAllRoles().then((rows) => {
        let roles = rows;
        console.table(roles)
    }).then(() => mainPrompt())
}


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 12/31/2022
// Date Modified: 01/01/2023
// Name: viewAllEmployees
// Purpose: Displays all employees
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function viewAllEmployees() {
    db.findAllEmployees().then((rows) => {
        let employees = rows;
        console.table(employees)
    }).then(() => mainPrompt())
}




// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 12/31/2022
// Date Modified: 1/01/2023
// Name: mainPrompt
// Purpose: Asks questions to user about company
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------

function mainPrompt() {
    return prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Department",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        // Based on Users Choice
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployee();
                break;
            default:
                quit();

        }
    });



}

// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/01/2023
// Date Modified: 01/18/2023
// Name: quit
// Purpose: quits out of prompt
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function quit() {
    process.exit();
}

// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/05/2023
// Date Modified: 01/05/2023
// Name: addDepartment
// Purpose: adds new department
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function addDepartment() {
    // Add the name
    prompt([
        {
            name: "name",
            message: "What is the new department name?",
        }
    ]).then(async (res) => {
        let newDept = await db.createDepartment(res);
        // console.log(newDept)
    }).then(() => mainPrompt())
}


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/05/2023
// Date Modified: 01/18/2023
// Name: addRole
// Purpose: adds new role
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function addRole() {
    // Add the name

    db.findAllDepartments().then((rows) => {
        let departments = rows;
        // console.log(departments);
        departments = departments.map((item) =>
        ({
            value: item.id,
            name: item.name
        }))

        // console.log(departments);
        prompt([
            {
                name: "title",
                message: "What is the name of new role?",
            },
            {
                name: "salary",
                message: "What is the new role's salary?",
            },
            {
                name: "department_id",
                type: 'list',
                message: "What department does the role belong to?",
                choices: departments
            }
        ]).then(async (res) => {
            let roleInfo = await db.createRole(res);
            // console.log(roleInfo)
        }).then(() => mainPrompt())
    });
}




// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/05/2023
// Date Modified: 01/18/2023
// Name: addEmployee
// Purpose: adds new Employee
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function addEmployee() {

    prompt([
        {
            name: "first_name",
            message: "What first name?",
        },
        {
            name: "last_name",
            message: "What last name?",
        }
    ]).then(res => {
        let firstname = res.first_name;
        let lastname = res.last_name;

        db.findAllRoles().then((rows) => {
            let roles = rows;

            // console.log(roles);
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            prompt({
                type: "list",
                name: "roleId",
                message: "What is the employee role?",
                choices: roleChoices
            }).then(res => {
                let roleId = res.roleId;
                db.findAllEmployees().then((rows) => {
                    let employee = rows;
                    const managerChoices = employee.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
                    managerChoices.unshift({
                        name: "None",
                        value: null
                    });
                    prompt({
                        type: "list",
                        name: "managerId",
                        message: "Who is the employees manager?",
                        choices: managerChoices
                    }).then(res => {
                        let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstname,
                            last_name: lastname
                        }
                        db.createEmployee(employee);
                    }).then(() => {
                        console.log(`Added ${firstname} ${lastname} to the database`)
                        // mainPrompt();
                    }
                    )
                })
            }).then(() => mainPrompt());




        });
    });

}

// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/18/2023
// Date Modified: 01/18/2023
// Name: updateEmployee
// Purpose: Updates employee info
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------






function updateEmployee() {


    db.findAllEmployees().then((rows) => {
        let employees = rows;
        // console.log(employees);
        employees = employees.map((item) =>
        ({

            name: `${item.first_name} ${item.last_name}`,
            value: item.employee_ids
        }))
        // console.log(employees);

        prompt([
            // {
            //     name: "first_name",
            //     message: "What is the new first name?",
            // },
            // {
            //     name: "last_name",
            //     message: "What is the new last name?",
            // }


            {
                name: "empId",
                type: "list",
                message: "Who are we updating?",
                choices: employees
            }
        ]).then(res => {
            let firstname;
            let lastname;
            let empId = res.empId;
            console.log(empId);
            // Find employee by id
           


            // Find employee by id
            db.findEmployeeById(empId).then((rows) => {
                let employee = rows[0];
                console.log(employee);
                firstname = employee.first_name;
                lastname = employee.last_name;
                console.log(firstname);
                console.log(lastname);
            }).then(() => {
                db.findAllRoles().then((rows) => {
                    let roles = rows;

                    // console.log(roles);
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "\nWhat is the employee new role?",
                        choices: roleChoices
                    }).then(res => {
                        let roleId = res.roleId;
                        db.findAllEmployees().then((rows) => {
                            let employee = rows;
                            const managerChoices = employee.map(({ employee_ids,first_name,last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: employee_ids
                            }));
                            console.log(managerChoices);
                            managerChoices.unshift({
                                name: "None",
                                value: null
                            });
                            
                            prompt({
                                type: "list",
                                name: "managerId",
                                message: "\nWho is the employee's new manager?",
                                choices: managerChoices
                            }).then(res => {
                                // console.log(res);
                                let employee = {
                                    manager_id: res.managerId,
                                    role_id: roleId,
                                    first_name: firstname,
                                    last_name: lastname
                                }
                                console.log(employee)
                                db.updateEmployee(employee.role_id);
                                
                            }).then(async () => {
                                 console.log(`Updated ${firstname} ${lastname} to the database`)
                            //    mainPrompt();
                            }); //.then(() => mainPrompt());
                        })
                    })






                });
            });

        }).then(async () => mainPrompt());

    });

}

mainPrompt();





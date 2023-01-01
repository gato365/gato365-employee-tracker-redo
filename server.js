const { prompt } = require('inquirer');

const db = require("./db");





// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 12/31/2022
// Date Modified: 12/31/2022
// Name: getDepartment
// Purpose: Gets Department info
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------

function mainPrompt() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Department",
                    value: "VIEW_DEPARTMENT"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
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

        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            default:
                quit();



        }
    });



}

function viewAllEmployees() {
    db.findAllEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees)
    }).then(() => mainPrompt())
}


function addEmployee() {

    prompt([
        {
            name: "first_name",
            message: "WHa first name?",
        },
        {
            name: "last_name",
            message: "What last name?",
        }
    ]).then(res => {
        let firstname = res.first_name;
        let lastname = res.last_name;

        db.findAllRoles().then(([rows]) => {
            let roles = rows;
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
                db.findAllEmployees().then(([rows]) =>{
                    let employee = rows;
                    const managerChoices = employees.map(({id,first_name,last_name}) =>({
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
                    }).then(() => 
                    console.log(`Added ${ firstname} ${lastname} to the database`)
                    ).then(() => mainPrompt)
                })
            })




        });
    });

}



mainPrompt();





const { prompt } = require('inquirer');
const express = require('express');
const db = require("./db");
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());








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









function getDepartment() {
    // Question 1: Funtions , Call Back Functions, Arrow Functions, Promise, Await & Async
    return new Promise((resolve) => { // Question 2: Why is there not are reject?
        connection.query("select * from department", function (err, results) {
            resolve(results);
            console.log(results);
        });
    });
}



app.get("/api/departments", (req, res) => {
    getDepartment().then((allDepartments) => {
        const allDepartmentsString = JSON.stringify(allDepartments);
        res.send(allDepartments);
    });
});

// Post
app.post("/api/add-department", (req, res) => {
    const { name } = req.body;
    connection.query("INSERT INTO department(name) values (?)  ", name, (err, result) => {
        res.status(200);
        res.end();
    });

})

// Update
app.get("/api/department/:id/employee", (req, res) => {
    const { id } = req.params;

    connection.query("select * from employee WHERE role_id =?", role_id,
        function (err, results) {
            res.json(results);
        });

})



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

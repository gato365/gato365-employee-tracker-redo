// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 01/18/2023
// Date Modified: 01/22/2023
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
                            const managerChoices = employee.map(({ employee_ids, first_name, last_name }) => ({
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
                                // mainPrompt();
                            }); //.then(() => mainPrompt());
                        })
                    })






                });

            });

        }).then(async () => {

            mainPrompt();
        });

    });

}

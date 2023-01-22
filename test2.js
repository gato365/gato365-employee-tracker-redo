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
        db.updateEmployee(employee, employee.role_id);

    })

    prompt([{
        name: "empId",
        type: "list",
        message: "\nWho are we updating?",
        choices: employees
    }]).then(res => {
        let firstname;
        let lastname;
        let empId = res.empId;
        console.log(empId);

        db.findAllRoles().then((rows) => {
            let roles = rows;
            roles = roles.map((item) =>
            ({
                name: item.title,
                value: item.id
            }))
            console.log(roles);
            prompt([{
                name: "roleId",
                type: "list",
                message: "\nWhat is the new role?",
                choices: roles
            }]).then(res => {
                let roleId = res.roleId;
                console.log(roleId);
                db.updateEmployeeRole(empId, roleId);
            });
        });

    }).then(() => {
        async function callMainPrompt() {
            await mainPrompt();
        }
        callMainPrompt();
    });




})
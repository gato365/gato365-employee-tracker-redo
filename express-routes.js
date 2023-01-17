const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



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

// Add
app.post("/api/add-department", (req, res) => {
    const { name } = req.body;
    connection.query("INSERT INTO department(name) values (?)  ", name, (err, result) => {
        res.status(200);
        res.end();
    });

})

// Update Based on id
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

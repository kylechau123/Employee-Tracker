const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.user,
    password: process.env.DBpassword,
    database: process.env.DBname,
})

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
            ]
        }
    ]).then(answers => {
        if(answers.action == "View all departments"){
           viewAllDepartments()
        }if(answers.action == "View all roles"){
            viewAllRoles()
        }if(answers.action == "View all employees"){
            viewAllEmployees()
        }if(answers.action == "Add a department"){
            addDepartment()
        }if(answers.action == "Add a role"){
            addRole()
        }if(answers.action == "Add an employee"){
            addEmployee()
        }if(answers.action == "Update an employee role"){
            updateRole()
        }
    })
}

function viewAllDepartments(){
    db.query("Select * from department;", (err, res) => {
        console.table(res)
        setTimeout(() => {
            mainMenu()
        }, 5000)
    })
}

function viewAllRoles(){
    db.query("Select * from role", (err, res) => {
        console.table(res)
        setTimeout(() => {
            mainMenu()
        }, 5000)
    })
}

function viewAllEmployees(){
    db.query("Select * from employee", (err, res) => {
        console.table(res)
        setTimeout(() => {
            mainMenu()
        }, 5000)
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        }
    ]).then(answers => {
        db.query("Insert into department(name) values (?)", [answers.departmentName], (err, res) => {
            console.log("Department added!")
            setTimeout(() => {
                mainMenu()
            }, 1000)
        });
    });
};

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "departmentID",
            message: "What is the name of the department ID that you would like to add this role to?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        }
    ]).then(answers => {
        db.query("Insert into role(title, department_id, salary) values (?, ?, ?)", [answers.roleName, answers.departmentID, answers.salary], (err, res) => {
            console.log("Role added!")
            setTimeout(() => {
                mainMenu()
            }, 1000)
        });
    });
};

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the assigned role of the new employee?"
        },
        {
            type: "input",
            name: "managerID",
            message: "Which manager will be assigned to the new employee?"
        }
    ]).then(answers => {
        if(answers.managerID == ''){
            answers.managerID = null
        }
        db.query("Insert into employee(first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, res) => {
            if(err) console.log(err)
            console.log("Employee added!")
            setTimeout(() => {
                mainMenu()
            }, 1000)
        });
    });
};

function updateRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeeID",
            message: "Which employee ID would you like to update?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the new role ID of the employee?"
        }
    ]).then(answers => {
        db.query("update employee set role_id=(?) where id = (?)", [answers.employeeID, answers.roleID], (err, res) => {
            console.log("Employee updated!")
            setTimeout(() => {
                mainMenu()
            }, 1000)
        });
    });
};

mainMenu()
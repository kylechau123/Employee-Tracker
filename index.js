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
            }, 5000)
        });
    });
};

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?"
        }
    ]).then(answers => {
        db.query("Insert into role(title) values (?)", [answers.roleName], (err, res) => {
            console.log("Role added!")
            setTimeout(() => {
                mainMenu()
            }, 5000)
        });
    });
};

// function addEmployee(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "firstName",
//             message: "What is the first name of the new employee?"
//         },
//         {
//             type: "input",
//             name: "lastName",
//             message: "What is the last name of the new employee?"
//         }
//     ]).then(answers => {
//         db.query("Insert into first_name(name) values (?)", [answers.firstName, answers.lastName], (err, res) => {
//             console.log("Employee added!")
//             setTimeout(() => {
//                 mainMenu()
//             }, 5000)
//         });
//     });
// };

function updateRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeeID",
            message: "Which employee would you like to update?"
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
            }, 5000)
        });
    });
    //update employee set role_id="(?)" where id = (?)
};

mainMenu()
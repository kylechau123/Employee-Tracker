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
    
        }if(answers.action == "View all employees"){
    
        }if(answers.action == "Add a department"){
            addDepartment()
        }if(answers.action == "Add a role"){
    
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

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        }
    ]).then(answers => {
        db.query("Insert into department(name) values (?)", [answers.departmentName], (err, res) => {
            console.log("Department Added!")
            setTimeout(() => {
                mainMenu()
            }, 5000)
        })
    })
}

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
    ])//update employee set role_id="(?)" where id = (?)
}



mainMenu()
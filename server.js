const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
//use console.table to print out items in a table format (instead of console.log)

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "madworldTSP100",
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});



const start = () => {
    inquirer.prompt({
            type: "list",
            name: "method",
            message: "What would you like to do?",
            choices: ["Add Employee", "Update Employee Role", "View All Employees", "Add Department", "View All Departments", "Add Role", "View All Roles"]
        })
        .then((answer) => {
            switch (method) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                default:
                    console.log("You must select one of the options above.");


            }
        })
}


const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter the Employee's first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter the Employee's last name."
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter the Employee's role ID."
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter the Employee's role ID."
        },
    ])
};

const updateEmployee = () => {};

const viewAllEmployees = () => {};

const addDepartment = () => {};

const viewAllDepartments = () => {};

const addRole = () => {};

const viewAllRoles = () => {};
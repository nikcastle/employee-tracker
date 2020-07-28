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
            choices: ["Add Employee", "Update Employee Role", "View All Employees", "Add Department", "View All Departments", "Add Role", "View All Roles", "Exit"]
        })
        .then((answer) => {
            switch (answer.method) {
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
                    connection.end();


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
    ]).then((data)=>{
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
        },
        (err, res)=>{
            if (err) throw err;
            console.log(`\n${res.affectedRows} Employee added to table.\n`); 
            start();  
        }
        )
    })
};

const updateEmployee = () => {

};

const viewAllEmployees = () => {
    connection.query("SELECT * FROM employee",(err,data)=>{
        if(err) throw err;
        console.table(data)
        start();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please enter the Department ID."
        },
        {
            type: "input",
            name: "name",
            message: "Please enter the Department name."
        }
    ]).then((data)=>{
        connection.query("INSERT INTO department SET ?",
        {
            id: data.id,
            name: data.name,
        },
        (err, res)=>{
            if (err) throw err;
            console.log(`\n${res.affectedRows} Department added to table.\n`); 
            start();  
        }
        )
    })
};

const viewAllDepartments = () => {
    connection.query("SELECT * FROM department",(err,data)=>{
        if(err) throw err;
        console.table(data)
        start();
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please enter the Role ID."
        },
        {
            type: "input",
            name: "title",
            message: "Please enter the Role Title."
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the Role Salary. (Format as ######.##)"
        },
        {
            type: "input",
            name: "dep_id",
            message: "Please enter the relevant Department ID."
        },
    ]).then((data)=>{
        connection.query("INSERT INTO role SET ?",
        {
            id: data.id,
            title: data.title,
            salary: data.salary,
            department_id: data.dep_id,
        },
        (err, res)=>{
            if (err) throw err;
            console.log(`\n${res.affectedRows} Role added to table.\n`); 
            start();  
        }
        )
    })
};

const viewAllRoles = () => {
    connection.query("SELECT * FROM role",(err,data)=>{
        if(err) throw err;
        console.table(data)
        start();
    })
};
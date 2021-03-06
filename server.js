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

connection.query = util.promisify(connection.query);

const start = () => {
    inquirer.prompt({
            type: "list",
            name: "method",
            message: "What would you like to do?",
            choices: ["Add Employee", "Update Employee Role","Remove an Employee","View All Employees", "Add Department", "Remove a Department","View All Departments", "Add Role", "Remove a Role","View All Roles", "Exit"]
        })
        .then((answer) => {
            switch (answer.method) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Remove an Employee":
                        deleteEmployee();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break; 
                case "Add Department":
                    addDepartment();
                    break;
                case "Remove a Department":
                    deleteDepartment();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove a Role":
                    deleteRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                default:
                    connection.end(); 


            }
        })
}


const addEmployee = async () => {
    try {
        const roles = await connection.query("SELECT * FROM role")
        const manager = await connection.query("SELECT * FROM employee manager")

        const data = await inquirer.prompt([{
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
                type: "rawlist",
                name: "role_id",
                message: "Please select the Employee's role.",
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                type: "rawlist",
                name: "manager_id",
                message: "Please enter the Employee's Manager.",
                choices: manager.map(manager => ({
                    name: manager.first_name + " " + manager.last_name,
                    value: manager.id
                }))
            },
        ])

        const res = await connection.query("INSERT INTO employee SET ?", data)

        console.log(`${res.affectedRows} Employee has been added.`);
        start();
    } catch (err) {
        throw err
    }

};

const updateEmployee = async () => {
    const employee = await connection.query("SELECT * FROM employee");
    const role = await connection.query("SELECT * FROM role");

    const data = await inquirer.prompt([{
            type: "list",
            name: "chosenEmployee",
            message: "Which Employee would you like to update?",
            choices: employee.map(employee => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }))
        },
        {
            type: "rawlist",
            name: "newRole",
            message: "What is the Employee's new role?",
            choices: role.map(role => ({
                name: role.title,
                value: role.id
            }))
        }

    ])
    const res = await connection.query("UPDATE employee SET ? WHERE ?", [{
            role_id: data.newRole
        },
        {
            id: data.chosenEmployee
        }
    ])
    console.log(`\n${res.affectedRows} has been updated.\n`);
    start();
};

const viewAllEmployees = async () => {
    try {
        const data = await connection.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.title, role.salary, department.name as department_name,  CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.last_name")
        console.table(data)
        start();
    } catch (err) {
        throw err;
    }
};

const addDepartment = async () => {
    try {
        const data = await inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Please enter the Department name."
        }]);
        const res = await connection.query("INSERT INTO department SET ?", {

            name: data.name,
        })

        console.log(`\n${res.affectedRows} Department added to table.\n`);
        start();

    } catch (err) {
        throw err;
    }

};

const viewAllDepartments = () => {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
        start();
    })
};

const addRole = async () => {
    try {
        const department = await connection.query("SELECT * FROM department");
    
    const data = await inquirer.prompt([
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
            type: "rawlist",
            name: "dep_id",
            message: "Please select the relevant Department",
            choices: department.map(department => ({
                name: department.name,
                value: department.id
            }))
        },
    ])
        const res = await connection.query("INSERT INTO role SET ?", {
                title: data.title,
                salary: data.salary,
                department_id: data.dep_id,
            });
            
                console.log(`\n${res.affectedRows} Role added to table.\n`);
                start();
    
} catch(err) {throw err};
};

const viewAllRoles = () => {
    connection.query("SELECT role.id, role.title, role.salary, department.name as department_name FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY department_name", (err, data) => {
        if (err) throw err;
        console.table(data)
        start();
    })
};

const deleteEmployee = async ()=> {
    try {
        const employee = await connection.query("SELECT * FROM employee")

        const data = await inquirer.prompt([
            {
                type: "rawlist",
                name: "employee",
                message: "Which Employee would you like to remove?",
                choices: employee.map(employee => ({
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }))
            },
        ])

        const res = await connection.query("DELETE FROM employee WHERE id=?", data.employee)

        console.log(`${res.affectedRows} Employee has been removed.`);
        start();
    } catch (err) {
        throw err
    }

}

const deleteRole = async ()=> {
    try {
        const role = await connection.query("SELECT * FROM role")

        const data = await inquirer.prompt([
            {
                type: "rawlist",
                name: "role",
                message: "Which Role would you like to remove?",
                choices: role.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
        ])

        const res = await connection.query("DELETE FROM role WHERE id=?", data.role)

        console.log(`${res.affectedRows} Role has been removed.`);
        start();
    } catch (err) {
        throw err;
    }

};

const deleteDepartment = async ()=> {
    try {
        const department = await connection.query("SELECT * FROM department")

        const data = await inquirer.prompt([
            {
                type: "rawlist",
                name: "department",
                message: "Which department would you like to remove?",
                choices: department.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            },
        ])

        const res = await connection.query("DELETE FROM department WHERE id=?", data.department)

        console.log(`${res.affectedRows} Department has been removed.`);
        start();
    } catch (err) {
        throw err;
    }

};
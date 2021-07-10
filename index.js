const inquirer = require('inquirer');
const consoletable = require('console.table');
const mysql = require('mysql2');


// Create connection to db.sql
// Create a connection from the db.sql to the sql server
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'nevayah8',
      database: 'employee'
    });

connection.connect(function (err){
    if (err) throw err;
    initProgram();
})


console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

 //start the loop, ask user question and provide employee tracker choices 
function initProgram()
    {
        //run inquirer
        inquirer.prompt([
            {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Quit']
        }])
        .then(function(answer){
            switch(answer.selection){
                case 'View all departments':
                viewDepartment();
                break;

                case 'View all roles':
                viewRoles();
                break;

                case 'View all employees':
                viewEmployees();
                break;

                case 'Add a department':
                addDepartment();
                break;

                case 'Add a role':
                addRole();
                break;

                case 'Add an employee':
                addEmployee();
                break;

                case 'Quit':
                quitProgram();
                break;
            }
        })
                
        //.then switch cases, based off of choices selection display/present user with options 
    }

//create functions for each switch case scenario, (VIEW, ADD, UPDATE)
//using SELECT / SELECT * FROM to retrieve specific information and display it (for "view..." choices)
function viewEmployees(){
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res); 
        initProgram();
    })
};

function addEmployee(){
    connection.query('SELECT * FROM roles', function (err, res){
        if (err) throw err;
        inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "Input employees first name",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "Input employees last name  "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "Enter the employees managers id number"
                },
                {
                    name: 'roles', 
                    type: 'list',
                    message: "Input employees Role", 
                    choices: chooseRole()
                }
                ]).then(function (answer){
                   var roleId = chooseRole().indexOf(answer.roles) + 1;
                    connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: roleId,
                    },
                    function (err){
                        if (err) throw err;
                        initProgram();
                    })
                })
        })
};

var roleArray = [];
function chooseRole(){
    connection.query('SELECT * FROM roles', function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
          roleArray.push(res[i].title);
        }
      })
      return roleArray;
}



//view department 
function viewDepartment(){
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res){
        if(err)throw err;
        console.table(res);
        initProgram();
    })
};


function addDepartment(){
    inquirer
        .prompt([
            {
                name: 'departmentAdded', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer){
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.departmentAdded
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res){
                if(err)throw err;
                console.table(res);
                initProgram();
                })
            })
};



// view roles 
function viewRoles(){
    var query = 'SELECT * FROM roles';
    connection.query(query, function(err, res){
        if(err)throw err;
        console.table(res);
        initProgram();
    })
};


// add role
function addRole(){
    connection.query('SELECT * FROM department', function(err, res){
        if (err) throw err;
        inquirer .prompt([
            {
                name: 'add_role',
                type: 'input', 
                message: "Enter Role"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter Salary'
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Choose the Department',
                choices: function(){
                    var chosenDepartment = [];
                    for (let i = 0; i < res.length; i++){
                    chosenDepartment.push(res[i].name);
                    }
                    return chosenDepartment;
                },
            },
        ]).then(function (answer){
            let departmentChoices;
            for (let i = 0; i < res.length; i++) {
                if (res[i].name == answer.department_id){
                    departmentChoices = res[i].id;
                }
            }
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.add_role,
                    salary: answer.salary,
                    department_id: departmentChoices
                },
                function (err, res){
                    if(err)throw err;
                    console.table(res);
                    initProgram();
                })
        })
    })
};

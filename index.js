const db = require('db');
const inquirer = require('inquirer');
const consoletable = require('console.table');

console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)


 //start the loop, ask user question and provide employee tracker choices 
function initProgram()
    {
        //run inquirer
        inquirer
        .prompt({
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: [
                "View all departments", 
                "View all roles", 
                "View all employees", 
                "Add a department", 
                "Add a role", 
                "Add an employee", 
                "Update an employee role", 
                "Quit"]
        })
        //.then switch cases, based off of choices selection display/present user with options 
    }
//create functions for each switch case scenario, 
//using SELECT / SELECT * FROM to retrieve specific information and display it (for "view..." choices)

//using inquirier for each "add..." choice create a prompt to fill out required information for each selection 
//functions for add role, add emplyee, and add departement 

//create a function for choice update employee, retrieve employee list from data base 
//use inquirer to prompt user to input employee changes 

//Quit function 


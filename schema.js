var mysql = require ("mysql");
var inquirer = require("inquirer");
var table = require ("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    // Your password
    password: "blasT123!",
    database: "employee_trackerdb"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    runApp();
  });

    // function which prompts the user for what action they should take

function runApp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "View Employees By Department", "View Employees By Role", "Add New Employee",
       "Edit Employee Manager", "Edit Employee Role", "Remove Employee"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;
  
        case "View All Departments":
          viewDepartments();
          break;
  
        case "view Employee Roles":
          viewRoles();
          break;
  
        case "View Employees by Role":
          viewByRole();
          break;

        case "Add New Employee":
          addNewEmployee();
          break;
  
        case "View Employees by Department":
          viewEmployeesDept();
          break;
      }
    });
}
      



//View employees//

function viewEmployees() {

  connection.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
      console.table(results);
      connection.end();
      return results;

  });

}

//View departments//

function viewDepartments() {

connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    console.table(results);
    connection.end();
    return results;

});

}

// View Roles//

function viewRoles() {

connection.query("SELECT * FROM role", function(err, results) {
    if (err) throw err;
    console.table(results);
    connection.end();
    return results;

});

}


// View employee by department//
function viewEmployeesDept() {

console.log("Inside  employeeByDept function");

return inquirer
.prompt({
  name: "name",
  type: "list",
  message: "Select Department",
  choices: ["Administration", "Accounting", "Marketing", "Inventory", "Customer Service"]
})
  .then(function(answer){
    var query = "SELECT e.first_name, e.last_name, d.name FROM employee e, role r, department d WHERE e.role_id = r.id AND r.department_id = d.id AND  ?";
    connection.query(query, { name: answer.name}, function(err, results) {
      if (err) throw err;
      console.table(results);
      connection.end();
      return results;

    });
    // console.log(name);
  });

}

//View employee by their role//

function  viewByRole() { 

console.log("Inside  employeeByRole function");

return inquirer
.prompt({
  name: "empName",
  type: "list",
  message: "Which employee do you want to remove?",
  choices: ["Administration", "Accounting", "Marketing", "Inventory", "Customer Service"]
})
  .then(function(answer){
    var query = "SELECT e.first_name, e.last_name, r.title FROM employee e, role r WHERE e.role_id = r.id AND ?";
    connection.query(query, { title: answer.role}, function(err, results) {
      if (err) throw err;
      console.table(results);
      connection.end();
      return results;

    });
   
  });

}

//Add a New Employee//


function addNewEmployee(){
  inquirer
      .prompt([{
          name: "Name",
          type: "input",
          message: "Enter employee's first name: "
      },
      {
          name: "lastName",
          type: "input",
          message: "Enter employees last name: "
      },
      {
          name: "roleID",
          type: "input",
          message: "Enter role ID: "
      },
      {
          name: "managerID",
          type: "input",
          message: "Enter mananger ID: "
      }
  ])
      .then(function (answer) {
          connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}",${answer.roleID},${answer.managerID})`, function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
          })
          
          connection.end();
      });
}
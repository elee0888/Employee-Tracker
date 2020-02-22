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
    runSearch();
  });

    // function which prompts the user for what action they should take

function runSearch() {
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

        case "view  Manager":
            viewManager();
            break;

        case "view Employee Roles":
          viewRoles();
          break;

        case "Add New Employee":
          addNewEmployee();
          break;
  
        case "Add by Department":
          addNewDept();
          break;

        case "Add by Role":
            addNewRole();
            break;

        case "Remove Employee":
            removeEmployee();
            break;
           
        case "Update Employee":
             employeeUpdate();
             break; 
             
        case "Update Employee for Manager":
             employeeManager();
             break;      
      }
    });
}
      



//View employees//

function viewEmployees() {
  inquirer
    .prompt({
      name: "employeeView",
      type: "input",
      message: "What employee would you like to search for (by last name)?"
    })
    .then(function (answer) {
      var query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.employeeView }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
        }

        runSearch();
      });
    });
}

function viewDepartments() {
  var query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
}

function viewManager() {
  var query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }

    runSearch();
  });
}

function addNewEmployee() {
  inquirer
    .prompt({
      name: "employeeAdd",
      type: "input",
      message: ["To ADD an employee, enter Employee First Name then Last Name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}

function addNewDept() {
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: ["To ADD a department, enter new department name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}
function addNewRole() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter new role name"]
    })
    .then(function (answer) {
      var title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter new role salary"]
        })
        .then(function (answer) {
          var salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter new role department id"]
            })
            .then(function (answer) {
              var department_id = answer.department_id;

              console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

              var query = "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(query, [[[title, salary, department_id]]], function (err, res) {
                if (err) {
                  console.log(err);
                }

                runSearch();
              });
            })
        })
    })

}

function removeEmployee() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id",

    })
    .then(function (answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runSearch();

      });
    });
}

function employeeUpdate() {
  console.log('updating emp');
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            runSearch();
          });
        });
    });
}

function employeeManager() {
  inquirer
    .prompt({
      name: "employeeManager",
      type: "input",
      message: "What employee would you like to update the manager for?",

    })
    .then(function (answer) {
      var query = "SELECT manager_id FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employee);
        }

        runSearch();
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
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

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Find songs by artist",
          "Find all artists who appear more than once",
          "Find data within a specific range",
          "Search for a specific song",
          "exit"
        ]
      })
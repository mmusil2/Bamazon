require("dotenv").config();

var Table = require('cli-table2');
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");

var password =  keys.mysql.password;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runOptions();
});

function runOptions() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Select an option",
        choices: [
            "View Products Sales by Department",
            "Create New Department"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Products Sales by Department":
            viewSales(); 
            break;
        case "Create New Department":
            newDept(); 
            break;
        }
    });
}

function viewSales() {
    
}
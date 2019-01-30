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
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_name",
    function(err, res) {
        if (err) throw err;
        // console.log(res);
        var table = new Table({
            head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
            // colWidths: [100, 200]
        });

        for (i=0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit])
        }
        console.log(table.toString());
        runOptions();
        // connection.end();
    });
}

function newDept() {
    
}
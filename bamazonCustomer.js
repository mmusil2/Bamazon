require("dotenv").config();

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
    showProducts();
    // buyProduct();
    // connection.end();
});

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        buyProduct();
        // connection.end();
    });
}

function buyProduct () {
    inquirer.prompt([
        {
        name: "id",
        message: "What is the ID of the product you would like to buy?"
        }, {
        name: "units",
        message: "How many units would you like to buy?"
        }
    ]).then(function(answers) {
        var id = answers.id;
        var units = answers.units;
            connection.query("SELECT * FROM products WHERE item_id = " + id, function(err, res) {
                if (err) throw err;
                // console.log(units);
                // console.log(res[0].stock_quantity);
                if (units > res[0].stock_quantity) {
                    console.log("Insufficient quantity!");
                } else {
                    // *********************************************************
                    // ******** CONNECTION UPDATE AND CONSOLE.LOG COST**********
                    // *********************************************************
                }
            }
        )
    });
}
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
        // console.log(res);
        for (i=0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        }
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
                    connection.end();
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: res[0].stock_quantity - units
                            },
                            {
                                item_id: id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("Purchase complete");
                            console.log("You paid: $" + res[0].price * units);
                            connection.end();
                        }
                    );
                }
            }
        )
    });
}
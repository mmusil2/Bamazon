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
    runOptions();
});

function runOptions() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Select an option",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
            productSearch(); 
            break;
        case "View Low Inventory":
            lowInv(); 
            break;
        case "Add to Inventory":
            addInv(); 
            break;
        case "Add New Product":
            addProduct(); 
            break;   
        }
    });
}

function productSearch() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // console.log(res);
        for (i=0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        runOptions();
        // connection.end();
    });
}

function lowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        for (i=0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        runOptions();
    });
}

function addInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;    
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: function() {
                    var choiceArray = [];
                    for (i=0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Select an item"
            },
            {
                name: "amount",
                type: "input",
                message: "How much do you want to add?"
            }
        ]).then(function(answer) {
            var chosenItem;
            console.log(answer.choice);
            for (i=0; i < res.length; i++) {
                if (res[i].product_name === answer.choice) {
                    chosenItem = res[i];
                }
            }
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: parseInt(chosenItem.stock_quantity) + parseInt(answer.amount)
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function(error) {
                    if (error) throw error;
                    runOptions();
                }
            );
        });

    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Enter the name of the product"
        },
        {
            name: "department_name",
            type: "input",
            message: "Enter the department of the product"
        },
        {
            name: "price",
            type: "input",
            message: "Enter the price of the product"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Enter the starting stock quantity"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            },
            function(err) {
                if (err) throw err;
                console.log("Successfully added");
                runOptions();
            }
        );
    });
}
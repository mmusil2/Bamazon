-- CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (50) NULL,
    department_name VARCHAR (50) NULL,
    price DECIMAL (10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 300, 20),
("Bananas", "Food", 3.21, 384),
("Virtual Boy", "Video Games", 130.99, 4), 
("DeLorean", "Auto", 31999.00, 11),
("Energy Drink", "Supplements", 4.50, 8000),
("Cookies", "Food", 5.21, 534),
("Electric Guitar", "Instruments", 275.95, 14),
("Blackout Stout", "Alcohol", 11.89, 133),
("Blade Runner 2049", "Movies", 17.50, 4665),
("Metal Gear Solid", "Video Games", 49.81, 344);

SELECT * FROM products;
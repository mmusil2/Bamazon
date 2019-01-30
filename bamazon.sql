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


SELECT * FROM products GROUP BY stock_quantity HAVING count(*) < 5;

SELECT * FROM products WHERE stock_quantity < 5;


SELECT * FROM products;


CREATE TABLE departments (
	department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (50) NULL,
    over_head_costs DECIMAL (10,2),
    PRIMARY KEY (department_id)
);

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 300),
("Food", 80),
("Auto", 200),
("Food", 25),
("Supplements", 30),
("Instruments", 74),
("Alcohol", 36),
("Movies", 22);


ALTER TABLE products
ADD product_sales DECIMAL (10,2);


UPDATE products SET product_sales = 0 WHERE item_id = 3;


SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit
FROM departments INNER JOIN products ON (departments.department_name = products.department_name)
GROUP BY departments.department_name
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Dawid",
    password: "Element1234!",
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    customerTable();
});

function questions() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter ID product of the product you would like to buy",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        ,
        {
            name: "quantity",
            type: "input",
            message: "How many units of product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", [{ item_id: answer.item_id }], function (err, res) {
            if (err) throw err
            var inputID = answer.item_id;
            var quantity = answer.quantity;
            var actualQuantity = res[0].stock_quantity;
            var remainingQuantity = actualQuantity - quantity
            if (actualQuantity > answer.quantity) {
                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [remainingQuantity, inputID], function (err, res) {
                    if (err) throw err
                })
                customerTableUpdated();
                console.log("-----------------------------------------------------");
                console.log(
                    "Your order is:", res[0].product_name, "\n",
                    "Order Quantity:", quantity, "\n",
                    "Total cost:", (quantity * res[0].price)
                );
                console.log("-----------------------------------------------------");
            }
            else {
                console.log("------------------------------------------------------");
                console.log("Is not enough items, please consider you order");
                console.log("------------------------------------------------------");
            }
            connection.end();
        })
    })
}

function customerTable() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res);
        questions();

    })
}

function customerTableUpdated() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.table(res);
    })
}
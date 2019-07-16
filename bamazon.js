var mysql = require("mysql");
// var inquirer = require("inquirer");
// const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Dawid",
    password: "",
    database: "bamazon"

});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    customerTable()
});

function customerTable(){
    inqurier.prompt([
        {
        name: "item_id",
        type: "number",
        message: "Please enter ID product of the product you would like to buy",
        validate: function(value){
            if (isNaN(value) === false){
                return true;
            }
            return false;
        }
    },
    {

    }
])
}
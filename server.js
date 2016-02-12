var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.NODE_ENV || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  database: "notes_db"
});

app.get("/", function(req, res){
  connection.query("SELECT * FROM notes", function(err, results){
    if (err) throw err;
    res.render("notes", {results});
  });
});

app.post("/", function(req,res){
  // debugger
  connection.query("INSERT INTO notes (note) VALUES (?)", [req.body.note]);
  res.redirect("/");
});

app.listen(PORT, function(){
  console.log("Listening on port %s", PORT);
});

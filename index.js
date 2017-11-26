//--------------------------------------
// Polify - David Lowes, 2017
//--------------------------------------
// Node, Express & Handlebars App
// Server file, dependencies below
//--------------------------------------



//Express
//------------------------------------------------------------------
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/assets'));

//Body Parser
//------------------------------------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Handebars
//------------------------------------------------------------------
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'handlebars');

//Router
//------------------------------------------------------------------
var router = require('./routes/routes.js');
app.use('/', router);

//Listening
//------------------------------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on Port: " + port);

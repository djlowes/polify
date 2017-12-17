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
app.use(bodyParser.json());
app.use(bodyParser.text());

//Handebars
//------------------------------------------------------------------
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'handlebars');

//Router
//------------------------------------------------------------------
var html = require('./routes/routes.js');
var data = require('./routes/data.js')
app.use('/', html);
app.use('/api', data);

//Listening
//------------------------------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on Port: " + port);

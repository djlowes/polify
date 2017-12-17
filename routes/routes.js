//--------------------------------------
//Dependencies
//--------------------------------------

var express = require("express");
var router = express.Router();
var path = require('path');

//--------------------------------------
//Routing
//--------------------------------------
router.get("/", function(req, res) {
  res.render('home');
});


//--------------------------------------
// Export routes for index.js to use
//--------------------------------------
module.exports = router;

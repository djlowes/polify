//--------------------------------------
//Dependencies
//--------------------------------------

var express = require("express");
var router = express.Router();
var congressman = require("../assets/js/congressman.js");
var path = require('path');

//--------------------------------------
//Routing
//--------------------------------------
router.get("/", function(req, res) {
  console.log(res)
  return res.json(congressman);
});

router.post("/", function(req, res) {
  console.log(res)
  res.json(congressman);
});

//--------------------------------------
// Export routes for index.js to use
//--------------------------------------
module.exports = router;

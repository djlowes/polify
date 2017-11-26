//--------------------------------------
//Dependencies
//--------------------------------------

var express = require("express");
var router = express.Router();

//--------------------------------------
//Routing
//--------------------------------------
router.get("/", function(req, res) {
  res.render('home');
});

// router.get("/survey", function(req, res) {
//   res.sendFile(path.join(__dirname, '../public', 'survey.html'));
// });

//--------------------------------------
// Export routes for index.js to use
//--------------------------------------
module.exports = router;

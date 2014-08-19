var express = require('express');
var router = express.Router();

var app = express();

/* GET sample form page. */
router.get('/addMasterTool', function(req, res) {
  res.render('addMasterTool');
});

module.exports = router;
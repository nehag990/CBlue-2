var express = require('express');
var router = express.Router();

var app = express();

/* GET sample form page. */
router.get('/sampleform', function(req, res) {
  res.render('sampleform');
});

module.exports = router;
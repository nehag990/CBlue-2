var express = require('express');
var router = express.Router();

var app = express();

/* GET helloworld page. */
router.get('/addCompany', function(req, res) {
  res.render('addCompany', { title: 'Add Company' });
});


module.exports = router;

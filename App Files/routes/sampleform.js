var express = require('express');
var router = express.Router();

var app = express();

/* GET helloworld page. */
router.get('/sampleform', function(req, res) {
  res.render('sampleform', { title: 'Sample Form' });
});


module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/startApp', function(req, res) {
  res.render('startApp', { title: 'Express' });
});

module.exports = router;

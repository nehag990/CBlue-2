var express = require('express');
var router = express.Router();

/* GET helloworld page. */
router.get('/startApp', function(req, res) {
  res.render('startApp');
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET helloworld page. */
router.get('/fieldEngrHome', function(req, res) {
  res.render('fieldEngrHome');
});

module.exports = router;
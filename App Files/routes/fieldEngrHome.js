var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fieldEngrHome', function(req, res) {
  res.render('fieldEngrHome', { title: 'Express' });
});

module.exports = router;

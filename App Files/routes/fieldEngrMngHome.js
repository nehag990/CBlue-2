var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fieldEngrMngHome', function(req, res) {
  res.render('fieldEngrMngHome', { title: 'Express' });
});

module.exports = router;

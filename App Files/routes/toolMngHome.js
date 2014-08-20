var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/toolMngHome', function(req, res) {
  res.render('toolMngHome', { title: 'Express' });
});

module.exports = router;

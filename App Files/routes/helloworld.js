var express = require('express');
var router = express.Router();

/* GET helloworld page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World' });
});

module.exports = router;

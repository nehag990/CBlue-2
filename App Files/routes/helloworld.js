var express = require('express');
var router = express.Router();

/* GET helloworld page. */
router.get('/helloworld', function(req, res) {
  var myArray = [];
  myArray.push({
  	userid: "Test1",
  	name: "Test First",
  	password: "testuno"
  });
  myArray.push({
  	userid: "Test2",
  	name: "Test Second",
  	password: "testdos"
  });
  req.session.firstname = 'FirstSession';
  req.session.lastname = 'LastSession';
  res.render('helloworld', { 
  	firstname: req.session.firstname,
  	lastname: req.session.lastname,
  	tabletitle: 'Users',
  	header1: 'userID',
  	header2: 'Name',
  	header3: 'Passworld',
  	userset: myArray 
  });
});


module.exports = router;

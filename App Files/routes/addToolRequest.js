var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var MTool = mongoose.model('MasterTool');


router.get('/addToolRequest', function (req, res){
	Request.find()
	.exec(function (err, request) {
		MTool.find()
		.exec(function (err, list){
			res.render('addToolRequest', {toolList: list, requestList: request});		
		})
	})
});

module.exports = router;
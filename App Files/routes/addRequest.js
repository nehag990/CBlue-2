var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var MTool = mongoose.model('MasterTool');


router.get('/addRequest', function (req, res){
	Request.find()
	.sort('-_id')
	.limit(1)
	.exec(function (err, list){
		console.log(list);
		if (list._id !== undefined){
			var nextid = (list._id + 1);
		}
		else {
			var nextid = 1;
		} 
		MTool.find()
		.exec(function (err, toolList){
			res.render('addRequest', {id: nextid, toolList: toolList});	
		})
		
	});
});

module.exports = router;
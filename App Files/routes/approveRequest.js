var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var MTool = mongoose.model('MasterTool');
var Inventory = mongoose.model('ToolInventory')

router.get('/approveRequest', function (req, res){
	var id = req.param('id');
	if (id !== undefined) {
		Request.findById(id)
		.populate('ToolRequest')
		.exec(function (err, entry){
			MTool.populate(entry, {path: 'ToolRequest._masterTool'},
			function (err, tools) {
				Inventory.find()
				.populate('_TIMaster')
				.exec(function (err, inventory){
					res.render('approveToolRequest', {available:inventory, tools:tools, request:entry});
				})
				
			});
		});
		
	}else{
		Request.find()
		.exec(function (err, request) {
			res.render('approveRequest', {requests:request});
		});
	}
});

module.exports = router;
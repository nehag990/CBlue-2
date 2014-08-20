var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');
var MTool = mongoose.model('MasterTool');

router.get('/listInventory',function (req,res){
	var id = req.param('id');

	if (id !== undefined){
		Inventory.find({_id:id}, function (err, tool){
			res.render('editInventory', {list:tool})
		});
	} else {
		Inventory.find().populate('_TIMaster').exec(function (err, lists){
			res.render('listInventory',{list:lists});
			console.log('lists test: %s', lists);
		});
	}
	
});

module.exports = router;
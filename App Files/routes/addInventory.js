var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MasterTool = mongoose.model('MasterTool');

/* GET add inventory page. */
router.get('/addInventory', function(req, res) {
	MasterTool.find()
	.exec(function (err, toolList){
		res.render('addInventory', {toolList: toolList});
	})
});

module.exports = router;
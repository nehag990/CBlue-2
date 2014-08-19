var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var toolList = mongoose.model('MasterTool');

router.get('/listMasterTool', function (req,res) {
		
	var id = req.param('id');        //Attempts to retrieve id from query string 
	
	if (id !== undefined){           //Checks if editing item, otherwise render whole list  
		toolList.findById(id)        //Finds a single tool based on id
		.exec(function (err, edit) { //Calls on function to pass single MasterTool to next page page
			console.log(edit);
			res.render('editMasterTool', {tools: edit}); //Passes single MasterTool as "tools"
		});
	} else {
		toolList.find({}, function (err, tools) { //Finds a collection of tools
			res.render('listMasterTool', {tools: tools}); //Passes a collection of tools as "tools"
		});
	}
});

module.exports = router;
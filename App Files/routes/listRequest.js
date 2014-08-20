var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var Tool = mongoose.model('ToolRequest');
var MTool = mongoose.model('MasterTool');
var Inventory = mongoose.model('ToolInventory');

router.get('/listRequest', function (req, res){
	var id = req.param('id');
	var query = req.param('q');
	if (id !== undefined) {
		if(query == 'reqs') {
			console.log('request id: ' + id);
			Request.findById(id)
			.populate('ToolRequest')
			.exec(function (err, RList){
				MTool.populate(RList, {path: 'ToolRequest._masterTool'},
				function (err, REntries) {
					res.render('editRequest', {tool:REntries, list:RList});
				});
			});
		}
		else{
			console.log('Tool id: ' + id);
			Request.findById(query)
			.exec(function (err, TList) {
				MTool.populate(TList, {path: 'ToolRequest._masterTool'},
				function (err, TEntries) {
					
						MTool.find()
						.exec(function (err,MTools) {
							res.render('editToolRequest', {MTool: MTools, tool: TEntries, list:TList});	
						})
					
				});
			});
		}
	
	}else {
		Request.find()
		.populate('ToolRequest')
		.exec(function (err, request) {
			MTool.populate(request, {path: 'ToolRequest._masterTool'},
			function (err, entries) {
				Inventory.populate(entries, {path: 'ToolRequest._ToolInventory'},
					function (err, inventory){
						console.log(request);
						console.log(entries);
						console.log(inventory);
				//console.log('Entries: ' + entries);
				//console.log('Request: ' + request);
				res.render('listRequest', {Tools: entries, requestList: request});
				/*populating nested arrays involves using the populate function twice, 
				once to populate the Schema holding your array, and 
				once to reference the table associated with the array.
				As can be seen in the code above, you first retrieve the Schema holding the array 
				and reference it in the second populate function*/
				});
			});
		});
	}
});

module.exports = router;
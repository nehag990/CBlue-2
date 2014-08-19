var express = require('express');
var db = require('./model/db');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
// adding middleware management
var connect = require('connect');
var session = require('express-session');

// Routes to .js files (that is, accessible directly from application)
var routes = require('./routes/index');
var users = require('./routes/users');
var helloworld = require('./routes/helloworld');
var sampleform = require('./routes/sampleform');
var addCompany = require('./routes/addCompany');
var addMasterTool = require('./routes/addMasterTool');
var listMasterTool = require('./routes/listMasterTool');

// Routes to database operations in response to form inputs 
var createMasterTool = require('./model/createMasterTool');
var startApp = require('./routes/startApp');
var fieldEngrHome = require('./routes/fieldEngrHome');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// adding session management
app.use(session({
    secret: 'keyboardcat',
    saveUninitialized: true,
    resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// Access "helloworld" from browser
app.get('/helloworld', helloworld);
// Access "sampleform" from browser
app.get('/sampleform', sampleform);
// Display as a result of a "post" action (in this case from "sampleform.jade")
//First part of line states the page to rendered
//Second part sets values to be used in page
//req.body.{text} is used to request the element in the body of the page matching 
//entered text  
app.post('/showresults', function(req, res) { 
    res.render('showresults', {
        location: req.body.location, 
        fename: req.body.name, 
        feemail: req.body.email
    }); 
});

app.get('/addCompany', addCompany);

app.post('/displayCompany', function(req, res) { 
    res.render('displayCompany', {
        cname: req.body.name,
        cstreet: req.body.street,
        ccity: req.body.city,
        cstate: req.body.state,
        ccountry: req.body.country,
        csla: req.body.sla,
        ccontact: req.body.contact,
        cemail: req.body.email
    }); 
});

// Access form pages from browser
app.get('/addMasterTool', addMasterTool);
app.get('/listMasterTool', listMasterTool);
// Code to be executed in response to the form in "addMasterTool.jade"
// This code is separated from the app.js for clarity
// Contrast that with the code from the other operations below
app.post('/createMasterTool', createMasterTool);
// Local code in response of "editMasterTool.jade"
// This part deals with updating the Master Tool values
app.post('/updateMasterTool', function(req,res){
    var mongoose = require('mongoose');           //Adding the reference to Mongoose
    var MTool = mongoose.model('MasterTool');     //Reference to the model in the db file

    //var id = req.body.id;
    MTool.update({_id: req.body.id},
        {$set: {                                  //$set is the MongoDB update instruction
            MTName: req.body.name,                //name in db, then form name
            MTDescription: req.body.description,
            MTPrice: req.body.price,
            MTWeight: req.body.weight}}).exec();  //.exec() runs code on after grabbing data

    res.render('index');                          //Goes back to main page
});
// Local code in response of "editMasterTool.jade"
// This part deals with deleting the Master Tool
app.post('/deleteMasterTool', function(req,res){
    var mongoose = require('mongoose');
    var MTool = mongoose.model('MasterTool');

    MTool.remove({_id:req.body.id}).exec();       //remove is the MongoDB delete instruction

    res.render('index'); 
})

app.get('/startApp', startApp);
app.get('/fieldEngrHome', fieldEngrHome);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

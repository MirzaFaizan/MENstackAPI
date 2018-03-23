var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./config/db.config');
var mongoose = require('mongoose');
//express app
var app = express();

//parse request of content-type- application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//parse request of content type - application/json
app.use(bodyParser.json());

//settingup mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).catch((error) => {
    console.log("Exception \n"+error);
  });
mongoose.connection.on('error',function(){
    console.log("Could not connect to DB, exiting now ...");
    process.exit();
});
mongoose.connection.once('open',function(){
    console.log("Connected to MongoDB");
});
//simple route
app.get('/',function(req,res){
    res.json({"message":"Welcome to This new API of mine"});
});

//including all the files
require('./app/routes/user.routes')(app);

//starting server
app.listen(8080,function(){
    console.log("Magic happens on Port 8080");
});

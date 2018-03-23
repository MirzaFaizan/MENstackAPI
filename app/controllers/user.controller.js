var User = require('../models/user.model');

//create and save new user
exports.create = function(req , res){
    //check if the request JSON object is empty
    if(!req.body.content){
        return res.status(400).send(
            {
                message : "User cannot be empty"
            }
        );
    }
    //created a new user obj from User Model recieved by req
    var user = new User(
        {
            fname : req.body.fname,
            lname : req.body.lname,
            cnic: req.body.cnic,
            email: req.body.email
        }
    );

    //saving obj in  DB
    user.save(function(err,data){
        if(err){
            console.log(err);
        } else{
            res.send(data);
        }
    });
};

//Retrive and return all users
exports.findAll = function(req , res){
    User.find(function(err,users){
        if(err){
            console.log(err);
            res.status(500).send(
                {
                    message: "Some error Occured while fetching all users"
                }
            );
        }
    });
};

//Find a single user with user id
exports.findOne = function(req , res){

};

//update a user with userID
exports.update = function(req , res){

};

//delete a user with userID
exports.delete = function(req , res){

};
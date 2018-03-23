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
        } else{
            res.send(users);
        }
    });
};

//Find a single user with user id
exports.findOne = function(req , res){
    User.findById(req.params.userId,function(err,user){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "User not found with Id "+req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retriving user with id "+req.params.userId
            });
        }
        if(!user){
            return res.status(404).send({
                message: "User not found with Id "+req.params.userId
            });
        }
        res.send(user);
    });
};

//update a user with userID
exports.update = function(req , res){
    User.findById(req.params.userId,function(err,user){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "User not found with Id "+req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retriving user with id "+req.params.userId
            });
        }
        if(!user){
            return res.status(404).send({
                message: "User not found with Id "+req.params.userId
            });
        }

        //updating the searched obj
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.cnic= req.body.cnic;
        user.email= req.body.email;

        user.save(function(err,data){
            if(err){
                res.status(500).send({
                    message: "Could not update user with ID "+req.params.userId 
                });
            }else{
                res.send(data);
            }
        });
    });
};

//delete a user with userID
exports.delete = function(req , res){
    User.findByIdAndRemove(req.params.userId,function(err,user){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "User not found with Id "+req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retriving user with id "+req.params.userId
            });
        }
        if(!user){
            return res.status(404).send({
                message: "User not found with Id "+req.params.userId
            });
        }
        res.send({
            message: "User deleted Successfully!"
        });
    });
};
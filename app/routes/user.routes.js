module.exports = function(app){
    var users = require('../controllers/user.controller.js');

    //create a new user
    app.post('/users',users.create);
    
    //Retrive all users
    app.get('/users',users.findAll);

    //Retrive a single user with userID
    app.get('/users/:userId',users.findOne);

    //Update a user with userID
    app.put('/users/:userId',users.update);

    //Delete a user with userID
    app.delete('/users/:userId',users.delete);

};
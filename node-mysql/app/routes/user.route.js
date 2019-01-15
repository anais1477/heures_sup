const userService = require('../services/user.service');
var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
    router.route('/user')
        .get(getAllUsers)
        .post(addUser);
    router.route('/user/:id')
        .get(getUserById)
        .delete(deleteUser)
        .put(updateUser); 
}

function getAllUsers(req,res) {
  userService.getAllUser().then((data) => {
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getUserById(req,res) {

  let params = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,params,"user");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  userService.getUserById(params).then((data) => {
      console.log("user.route.js -> getUserById("+params.id+")");
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addUser(req,res) {
  var userData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  userService.addUser(userData).then((data) => {
      console.log("user.route.js -> addUser("+userData.name+", "+userData.age+", "+userData.state+", "+userData.country+"");
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}


function updateUser(req,res) {
   var userData=req.body;
   var id = req.params.id;
   userService.updateUser(id,userData).then((data)=>{
       console.log("user.route.js -> updateUser("+id+", "+userData.name+", "+userData.age+", "+userData.state+", "+userData.country+"");
      res.json(data);
  }).catch((err)=>{
      mail.mail(err);
      res.json(err);
   });
}


function deleteUser(req,res) {
  var delId = req.params.id;
    console.log("user.route.js -> deleteUser("+delId+")");
  userService.deleteUser(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
     mail.mail(err);
      res.json(err);
  });
}


module.exports.init = init;



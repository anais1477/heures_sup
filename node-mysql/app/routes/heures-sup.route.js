const heuresSupService = require('../services/heures-sup.service');
var schema = require('../schema/heuresSupValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
    router.route('/user/:id/heures-sup')
        .get(getAllHeuresSup)
        .post(addHeuresSup)
        .delete(deleteHeuresSup)
        .put(updateHeuresSup),
    router.route('/user/:id/heures-sup/mois/:date')
        .get(getAllHeuresSupByMonth)
        .post(addHeuresSup)
        .delete(deleteHeuresSup)
        .put(updateHeuresSup),
    router.route('/user/:id/heures-sup/jour/:date')
        .get(getAllHeuresSupByDay)
        .post(addHeuresSup)
        .delete(deleteHeuresSup)
        .put(updateHeuresSup),
    router.route('/export')
        .get(exportHeuresSup)


    ;
}

/*function getAllUsers(req,res) {
  userService.getAllUser().then((data) => {
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}*/

function getAllHeuresSup(req,res) {

  let userId = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,userId,"user");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

    heuresSupService.getAllHeuresSup(userId).then((data) => {
      console.log("heures-sup.route.js -> getAllHeuresSup("+userId.id+")");
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getAllHeuresSupByMonth(req,res) {

  let params = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,params,"user");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

    heuresSupService.getAllHeuresSupByMonth(params).then((data) => {
      console.log("heures-sup.route.js -> getAllHeuresSupByMonth("+params.id+")");
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getAllHeuresSupByDay(req,res) {

  let params = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,params,"user");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

    heuresSupService.getAllHeuresSupByDay(params).then((data) => {
      console.log("heures-sup.route.js -> getAllHeuresSupByDay("+params.id+")");
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addHeuresSup(req,res) {
    console.log("test");
    var heuresSupData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, heuresSupData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }
    console.log("test2");

  heuresSupService.addHeuresSup(heuresSupData).then((data) => {
      console.log("heures-sup.route.js -> addHeuresSup("+heuresSupData.id_user+", "+heuresSupData.date+", "+heuresSupData.heure_entree+", "+heuresSupData.heure_sortie+", "+heuresSupData.heure_midi+", "+heuresSupData.congé+","+heuresSupData.férié+")");
    res.json(data);
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}


function updateHeuresSup(req,res) {
  /* var userData=req.body;
   var id = req.params.id;
   userService.updateUser(id,userData).then((data)=>{
       console.log("user.route.js -> updateUser("+id+", "+userData.name+", "+userData.age+", "+userData.state+", "+userData.country+"");
      res.json(data);
  }).catch((err)=>{
      mail.mail(err);
      res.json(err);
   });*/
}

function exportHeuresSup(req,res) {
    var params=req.query;
    console.log("heures-sup.route.js -> exportHeuresSup("+params+")");
    console.log(params.date_debut);
    console.log(params.date_fin);
    heuresSupService.exportHeuresSup(params).then((data) => {
        console.log("heures-sup.route.js -> exportHeuresSup("+params+")");
        res.send(data);
    }).catch((err) => {
        //mail.mail(err);
        res.send(err);
    });
}


function deleteHeuresSup(req,res) {
  /*var delId = req.params.id;
    console.log("user.route.js -> deleteUser("+delId+")");
  userService.deleteUser(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
     mail.mail(err);
      res.json(err);
  });*/
}


module.exports.init = init;




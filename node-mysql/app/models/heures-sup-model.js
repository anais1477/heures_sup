var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var moment = require('../../node_modules/moment/moment');

var heuresSupModel = {
    addHeuresSup:addHeuresSup,
    getAllHeuresSup:getAllHeuresSup,
    getAllHeuresSupByMonth:getAllHeuresSupByMonth,
    getAllHeuresSupByDay:getAllHeuresSupByDay,
    exportHeuresSup:exportHeuresSup
}

function getAllHeuresSup(params) {
    console.log("heures-sup-model.js -> getAllHeuresSup("+params.id+")");
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM heures_sup WHERE id_user ="+params.id,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getAllHeuresSupByMonth(params) {
    console.log("heures-sup-model.js -> getAllHeuresSupByMonth("+params.id+","+params.date+")");
    let myDate = moment(params.date, 'DD-MM-YYYY').toDate();
    let myDateTime = moment(myDate).format('YYYY-MM-DD HH:mm:ss');
    console.debug("conversion to datetime: "+myDateTime);
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM heures_sup WHERE id_user ="+params.id+" AND " +
            "MONTH(date) = MONTH('"+myDateTime+"') " +
            "AND YEAR(date) = YEAR('"+myDateTime+"')",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}
function getAllHeuresSupByDay(params) {
    console.log("heures-sup-model.js -> getAllHeuresSupByDay("+params.id+","+params.date+")");
    let myDate = moment(params.date, 'DD-MM-YYYY').toDate();
    let myDateTime = moment(myDate).format('YYYY-MM-DD HH:mm:ss');
    console.debug("conversion to datetime: "+myDateTime);
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM heures_sup WHERE id_user ="+params.id+" AND " +
            "DATE(date) = '"+myDateTime+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function addHeuresSup(heuresSup) {
    console.log("heures-sup-model.js -> addHeuresSup("+heuresSup.id_user+")");
     return new Promise((resolve,reject) => {
         db.query("INSERT INTO heures_sup(id_user,date,heure_entree,heure_sortie,heure_midi,congé,férié)" +
             "VALUES('"+heuresSup.id_user+"','"+heuresSup.date+"', '"+heuresSup.heure_entree+"','"+heuresSup.heure_sortie+"','"+heuresSup.heure_midi+"','"+heuresSup.congé+"','"+heuresSup.férié+"')",(error,rows,fields)=>{
            if(error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
          });
        });
}
function exportHeuresSup(params) {
    console.log("heures-sup-model.js -> exportHeuresSup("+params.date_debut+","+params.date_fin+")");
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM heures_sup WHERE " +
            "date BETWEEN '"+params.date_debut+"' " +
            "AND '"+params.date_fin+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}


module.exports = heuresSupModel;


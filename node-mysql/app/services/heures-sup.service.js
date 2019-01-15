var heuresSupModel = require("../models/heures-sup-model.js");
var Excel = require('exceljs');
var moment = require('../../node_modules/moment/moment');


var heuresSupService = {
    addHeuresSup: addHeuresSup,
    getAllHeuresSup: getAllHeuresSup,
    getAllHeuresSupByMonth: getAllHeuresSupByMonth,
    getAllHeuresSupByDay: getAllHeuresSupByDay,
    exportHeuresSup: exportHeuresSup
}

function getAllHeuresSup(params) {
    return new Promise((resolve,reject) => {
        heuresSupModel.getAllHeuresSup(params).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getAllHeuresSupByMonth(params) {
    return new Promise((resolve,reject) => {
        heuresSupModel.getAllHeuresSupByMonth(params).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}
function getAllHeuresSupByDay(params) {
    return new Promise((resolve,reject) => {
        heuresSupModel.getAllHeuresSupByDay(params).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function addHeuresSup(userData) {
    return new Promise((resolve,reject) => {
        heuresSupModel.addHeuresSup(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function exportHeuresSup(params) {
    return new Promise((resolve,reject) => {
        heuresSupModel.exportHeuresSup(params).then((data)=>{
            /*var wb = new Excel.Workbook();

            wb.xlsx.readFile("./test.xlsx").then(function(){

                var sh = wb.getWorksheet("Sheet1");

                sh.getRow(3).getCell(2).value = 32;
                wb.xlsx.writeFile("./test.xlsx");
                console.log("Row-3 | Cell-2 - "+sh.getRow(3).getCell(2).value);

                console.log(sh.rowCount);
                //Get all the rows data [1st and 2nd column]
                for (i = 1; i <= sh.rowCount; i++) {
                    console.log(sh.getRow(i).getCell(1).value);
                    console.log(sh.getRow(i).getCell(2).value);
                }
            })*/
            var workbook = new Excel.Workbook();
            var worksheet = workbook.addWorksheet('My Sheet');


            console.log(data);
            let totalHeureTravaillees = moment('00:00', 'HH:mm').format('HH:mm');
            let totalHeureSup = moment('00:00', 'HH:mm').toDate();
            let totalHeureSup25 = moment('00:00', 'HH:mm').toDate();
            let totalHeureSup50 = moment('00:00', 'HH:mm').toDate();
            let totalHeureSup100 = moment('00:00', 'HH:mm').toDate();
            let rows = [];

            //pour chaque semaine entre l'intervalle
                //pour chaque jour entre l'intervalle
                    //s'il y a un ou plusieurs enregistrement en base pour ce jour
                    //ajouter les heures aux valeurs totales
                    //s'il n'y a pas d'enregistrement ,compter comme une journée normale de 7h

            let dateDebut = moment(params.date_debut, 'YYYY-MM-DD');
            let dateFin = moment(params.date_fin, 'YYYY-MM-DD');
            let heureTravailleesByWeek = {};
            while (dateDebut.isSameOrBefore(dateFin, 'day')) {
                console.log(`Loop at ${dateDebut.format('YYYY-MM-DD')}`);
                if(heureTravailleesByWeek[dateDebut.week()] == undefined)
                    heureTravailleesByWeek[dateDebut.week()] = moment('00:00', 'HH:mm').format('HH:mm');
                let dateFound = false;
                let heureSup = {
                    id_heures_sup: 0,
                    id_user: 1,
                    date: dateDebut,
                    heure_entree: '09:00:00',
                    heure_sortie: '17:00:00',
                    heure_midi: '01:00:00',
                    'congé': 0,
                    'férié': 0,
                    chantier: null
                };
                let heureSupFound = [];
                //TODO horaires de nuit
                //TODO férié
                data.forEach(function(heure_sup, index) {
                    if(moment(heure_sup.date, 'YYYY-DD-MM').isSame(dateDebut)) {
                        dateFound = true;
                        heureSupFound.push(heure_sup);
                        return;
                    }

                });
                if(dateFound) {
                    console.log("dateFound");
                    heureSupFound.forEach(function(heure_sup, index) {
                        let heureEntree = moment(heureSup.heure_entree,"HH:mm:ss").format("HH:mm");
                        let heureSortie = moment(heureSup.heure_sortie,"HH:mm:ss").format("HH:mm");
                        let heureMidi = moment(heureSup.heure_midi,"HH:mm:ss").format("HH:mm");


                        let heureTravaillees = getTimeInterval(heureEntree, heureSortie, heureMidi);
                        console.log("heureTravaillees "+heureTravaillees);

                    });
                    //Pour chaque ligne heure sup trouvée
                        //Calculer nombre heures travaillées
                        //Ajouter au total semaine ou week-end ou nuit
                }
                else if(!(dateDebut.day() == 0 || dateDebut.day() == 6)){
                    //SI pas le week end
                    console.log("date not found and NOT WEEK END");
                    //Ajouter 7h travaillees au total
                    heureTravailleesByWeek[dateDebut.week()].add(7, 'hours');
                }

                console.log(heureSup);
                // IF IS WEEK END AND NO HEURE SUP
                if(!dateFound && (dateDebut.day() == 0 || dateDebut.day() == 6)){

                    dateDebut.add(1, 'days');
                    console.log("skip");
                    continue;
                }
                console.log("skipped ?");
                let myDate = moment(heureSup.date, 'YYYY-DD-MM').toDate();
                let year = moment(myDate).format('YYYY');
                let month = moment(myDate).format('MMMM');
                let week = moment(myDate).format('ww');
                let day = moment(myDate).format('dddd');
                let heureEntree = moment(heureSup.heure_entree,"HH:mm:ss").format("HH:mm");
                let heureSortie = moment(heureSup.heure_sortie,"HH:mm:ss").format("HH:mm");
                let heureMidi = moment(heureSup.heure_midi,"HH:mm:ss").format("HH:mm");


                let heureTravaillees = getTimeInterval(heureEntree, heureSortie, heureMidi);
                console.log("heureTravaillees "+heureTravaillees);

                /*totalHeureTravaillees = moment(totalHeureTravaillees, 'HH:mm')
                    .add(moment.duration(heureTravaillees).asMinutes(), 'minutes')
                    .format('HH:mm');
                console.log("totalHeureTravaillees "+totalHeureTravaillees);*/

                //TODO add more than 24hours
                let heureTravailleesThisWeek = heureTravailleesByWeek[dateDebut.week()];
                console.log("heureTravailleesThisWeek "+heureTravailleesThisWeek);
                heureTravailleesThisWeek = moment(heureTravailleesThisWeek, 'HH:mm')
                    .add(moment.duration(heureTravaillees, 'HH:mm').asMinutes(), 'minutes')
                    .format('HH:mm');
                console.log("heureTravailleesThisWeek "+heureTravailleesThisWeek);
                heureTravailleesByWeek[dateDebut.week()] = heureTravailleesThisWeek;
                console.log("heureTravailleesByWeek "+heureTravailleesByWeek);
                console.log(heureTravailleesByWeek);

                rows.push({
                    annee: year,
                    mois: month.toUpperCase(),
                    semaine: week,
                    jour: day.toUpperCase(),
                    date: moment(heureSup.date).format('DD/MM/YYYY'),
                    h_entree: heureEntree,
                    h_sortie: heureSortie,
                    h_midi: heureMidi,
                    /*h_nuit_entree: heure_sup.duree_pause,
                    h_nuit_sortie: heure_sup.duree_pause,*/
                    h_travaillees: heureTravaillees,
                    chantier: heureSup.chantier
                });
                dateDebut.add(1, 'days');
            }

            totalHeureTravaillees = moment(totalHeureTravaillees,"HH:mm").toDate();
            totalHeureTravaillees = moment(totalHeureTravaillees).format("HH");
            console.log("totalHeureTravaillees " +totalHeureTravaillees);
            if(totalHeureTravaillees >= 36){
                totalHeureSup = totalHeureSup - 36;
            }

            var rowsResume = [
                ['H sup en cours', totalHeureSup, 'H 25%',totalHeureSup25, 'H 50%',totalHeureSup50,'H 100%',totalHeureSup100],
                ['H sup Week en cours', '00:10', 'H 25%','00:00', 'H 50%','00:00','H 100%','00:00']
            ];
            worksheet.addRows(rowsResume);
            worksheet.getRow(9).values = ['ANNEE', 'MOIS', 'SEMAINE', 'JOUR', 'DATE',
                'H ENTREE', 'H SORTIE', 'H MIDI', 'H NUIT ENTREE', 'H NUIT SORTIE',
                'H TRAVAILLEES', 'CHANTIER'];

            /*Define your column keys because this is what you use to insert your data according to your columns, they're column A, B, C, D respectively being idClient, Name, Tel, and Adresse.
            So, it's pretty straight forward */
            worksheet.columns = [
                { key: 'annee', width: 10 },
                { key: 'mois', width: 15 },
                { key: 'semaine', width: 10/*, outlineLevel: 1*/ },
                { key: 'jour', width: 15 },
                { key: 'date', width: 15 },
                { key: 'h_entree', width: 15 },
                { key: 'h_sortie', width: 15 },
                { key: 'h_midi', width: 15 },
                { key: 'h_nuit_entree', width: 15 },
                { key: 'h_nuit_sortie', width: 15 },
                { key: 'h_travaillees', width: 15 },
                { key: 'chantier', width: 40 }
            ]
            worksheet.addRows(rows);
            workbook.xlsx.writeFile("./test.xlsx")
                .then(function() {
                    // done
                    console.debug("write Excel");
                });

            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
    function getTimeInterval(startTime, endTime, lunchTime){
        let start = moment(startTime, "HH:mm:ss");
        let end = moment(endTime, "HH:mm:ss");
        let minutes = end.diff(start, 'minutes');
        let interval = moment().hour(0).minute(minutes);
        interval.subtract(moment.duration(lunchTime).asMinutes(), 'minutes');
        return interval.format("HH:mm");
    }
}


module.exports = heuresSupService;


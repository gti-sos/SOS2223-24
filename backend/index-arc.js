var Datastore = require('nedb');
var db = new Datastore();
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/26061569/2s93JzMggQ";
const BASE_API_URL = "/api/v1";

var datosFichero = [{state_id:4,state_s:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"31/01/2000",day	:31,temp_max:13.5,hormin_temp_max	:1736,temp_min	:10.67,hormin_temp_min	:2135,temp_average	:11.26,hum_max	:91.9,hum_min	:73.8,hum_average	:83.5,wind_speed:596,wind_direction:317.3,radiation:2,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"01/02/2000",day	:32,temp_max	:19.16,hormin_temp_max	:1411,temp_min	:7.94,hormin_temp_min	:147,temp_average	:13.28,hum_max	:98.5,hum_min	:47.41,hum_average	:80.5,wind_speed:967,wind_direction:273,radiation:11.76,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"02/02/2000",day	:33,temp_max	:20.1,hormin_temp_max	:1305,temp_min	:9.42,hormin_temp_min	:651,temp_average	:14.29,hum_max	:98.6,hum_min	:50.03,hum_average	:80.8,wind_speed:1.179,wind_direction:61.06,radiation:13.18,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"03/02/2000",day	:34,temp_max	:19.42,hormin_temp_max	:1332,temp_min	:10.49,hormin_temp_min	:530,temp_average	:14.68,hum_max	:91.7,hum_min	:53,hum_average	    :68.89,wind_speed:1.058,wind_direction:337.2,radiation:13.33,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"04/02/2000",day	:35,temp_max	:17.88,hormin_temp_max	:1336,temp_min	:11.04,hormin_temp_min	:430,temp_average	:14.43,hum_max	:92.2,hum_min	:18.54,hum_average	:58.5,wind_speed:2.325,wind_direction:50.62,radiation:14.11,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"05/02/2000",day	:36,temp_max	:19.32,hormin_temp_max	:959,temp_min	:9.56,hormin_temp_min	:2338,temp_average	:14.8,hum_max	:81.6,hum_min	:11.57,hum_average	:37.77,wind_speed:2.89,wind_direction:56.1,radiation:14.4,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"06/02/2000",day	:37,temp_max	:16.61,hormin_temp_max	:1254,temp_min	:7.75,hormin_temp_min	:451,temp_average	:12.22,hum_max	:94.9,hum_min	:43.88,hum_average	:65.21,wind_speed:1.571,wind_direction:302.5,radiation:13.91,precipitation:0},
{state_id	:2,state_s	:"Huelva",station_id	:3,station_s	:"La Mojonera",date	:"07/02/2000",day	:38,temp_max	:20.84,hormin_temp_max	:1351,temp_min	:8.88,hormin_temp_min	:646,temp_average	:13.96,hum_max	:95.9,hum_min	:25.49,hum_average	:72.2,wind_speed:1.294,wind_direction:37.55,radiation:13.85,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"08/02/2000",day	:39,temp_max	:19.23,hormin_temp_max	:1405,temp_min	:10.16,hormin_temp_min	:435,temp_average	:14.42,hum_max	:91,hum_min	    :43.25,hum_average	:66.2,wind_speed:1.152,wind_direction:287,radiation:12.47,precipitation:0},
{state_id	:3,state_s	:"Sevilla",station_id	:2,station_s	:"La Mojonera",date	:"09/02/2000",day	:40,temp_max	:19.83,hormin_temp_max	:1355,temp_min	:10.29,hormin_temp_min	:609,temp_average	:14.68,hum_max	:94.9,hum_min	:36.78,hum_average	:66.35,wind_speed:1.676,wind_direction:60.25,radiation:13.9,precipitation:0}
];

module.exports = (app) => {
    
    
    app.get(BASE_API_URL+"/agrodata-almeria/docs",(req,res)=>{
        res.redirect(API_DOC_PORTAL);
      });


//Load Initial

      app.get(BASE_API_URL + "/agrodata-almeria/loadInitialData", (req, res) => {
        db.find({}, function(err,filteredList){
      
        if(err){
              res.status(500).send("CLIENT ERROR");
          
          }
          console.log(filteredList);
        if (filteredList.length === 0) {
          for(var i = 0; i<datosFichero.length;i++){
            db.insert(datosFichero[i]);
            
        }
        res.send(datosFichero.map((d)=>{
            delete d._id;
            return d;
        }));
          console.log("Se han creado datos")
        } else {
          res.send('Ya existen datos');
          console.log('Ya existen datos')
        }
      });
      });



//GET

app.get(BASE_API_URL + "/agrodata-almeria", (req, res) => {
    console.log("New GET req /agrodata-almeria");
    db.find({},(err,jobs)=>{
        if(err){
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        }else{
            res.json(jobs.map((j)=>{
                delete j._id;
                return j;
            }));
        
        }
    })   
});


//Get Filtrado

app.get(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
    const state_s = req.params.state_s;
    db.findOne({state_s: state_s}, (err, resource) => {
        if (err) {
            console.log(`Error getting resource ${state_s}: ${err}`);
            res.sendStatus(500);
        } else if (resource) {
            delete resource._id;
            res.json(resource);
            console.log(`New GET req /agrodata-almeria/${state_s}`);
        } else {
            res.status(404).json({error: "Recurso no encontrado"});
        }
    });
});
  
app.post(BASE_API_URL + "/agrodata-almeria", (req, res) => {
    const newRecord = req.body;
    
    if (
      !newRecord.hasOwnProperty("state_id") ||
      !newRecord.hasOwnProperty("station_id") ||
      !newRecord.hasOwnProperty("date") ||
      !newRecord.hasOwnProperty("day") ||
      !newRecord.hasOwnProperty("temp_max") ||
      !newRecord.hasOwnProperty("hormin_temp_max") ||
      !newRecord.hasOwnProperty("temp_min") ||
      !newRecord.hasOwnProperty("hormin_temp_min") ||
      !newRecord.hasOwnProperty("temp_average") ||
      !newRecord.hasOwnProperty("hum_max") ||
      !newRecord.hasOwnProperty("hum_min") ||
      !newRecord.hasOwnProperty("hum_average") ||
      !newRecord.hasOwnProperty("wind_speed") ||
      !newRecord.hasOwnProperty("wind_direction") ||
      !newRecord.hasOwnProperty("radiation") ||
      !newRecord.hasOwnProperty("precipitation")
    ) {
      res.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
      return;
    }
    
    db.findOne(
      {
        state_id: newRecord.state_id,
        station_id: newRecord.station_id,
        date: newRecord.date,
        day: newRecord.day,
        temp_max: newRecord.temp_max,
        hormin_temp_max: newRecord.hormin_temp_max,
        temp_min: newRecord.temp_min,
        hormin_temp_min: newRecord.hormin_temp_min,
        temp_average: newRecord.temp_average,
        hum_max: newRecord.hum_max,
        hum_min: newRecord.hum_min,
        hum_average: newRecord.hum_average,
        wind_speed: newRecord.wind_speed,
        wind_direction: newRecord.wind_direction,
        radiation: newRecord.radiation,
        precipitation: newRecord.precipitation,
      },
      (err, resource) => {
        if (err) {
          console.log(`Error getting resource ${newRecord.state_id}: ${err}`);
          res.sendStatus(500);
        } else if (resource) {
          res.status(409).send({ error: "Ya existe un elemento con los mismos datos" });
        } else {
          db.insert(newRecord, (err, data) => {
            if (err) {
              console.log(`Error inserting data: ${err}`);
              res.sendStatus(500);
            } else {
              res.sendStatus(201);
              console.log("Nuevo post /agrodata-almeria");
            }
          });
        }
      }
    );
  });

  app.post(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
    res.status(405).send("Método no permitido");
    console.log("Metodo no permitido");
  });

  app.delete(BASE_API_URL + "/agrodata-almeria", (req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        console.log(`Error removing data: ${err}`);
        res.sendStatus(500);
      } else {
        res.status(200).send(`Se han borrado ${numRemoved} registros correctamente`);
        console.log("Se ha borrado /agrodata-almeria");
      }
    });
  });

  app.delete(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
    const state_s = req.params.state_s;
    db.remove({ state_s: state_s }, {}, (err, numRemoved) => {
        if (err) {
            console.log(`Error removing data: ${err}`);
            res.sendStatus(500);
        } else if (numRemoved === 0) {
            res.status(404).send({ error: "No se encontró el elemento con el estado especificado" });
        } else {
            res.status(204).send(`El recurso con estado ${state_s} ha sido eliminado correctamente`);
            console.log(`Se ha eliminado el recurso con estado: ${state_s}`);
        }
    });
});

app.put(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
    const state_s = req.params.state_s; // Obtener el estado de la URL
    const updatedData = req.body; // Obtener los nuevos datos del cuerpo de la solicitud

    // Comprobar si el cuerpo de la solicitud contiene todos los campos requeridos
    if (!updatedData.hasOwnProperty("state_id") || !updatedData.hasOwnProperty("station_id") || !updatedData.hasOwnProperty("station_s") || !updatedData.hasOwnProperty("date") || !updatedData.hasOwnProperty("day") || !updatedData.hasOwnProperty("temp_max") || !updatedData.hasOwnProperty("hormin_temp_max") || !updatedData.hasOwnProperty("temp_min") || !updatedData.hasOwnProperty("hormin_temp_min") || !updatedData.hasOwnProperty("temp_average") || !updatedData.hasOwnProperty("hum_max") || !updatedData.hasOwnProperty("hum_min") || !updatedData.hasOwnProperty("hum_average") || !updatedData.hasOwnProperty("wind_speed") || !updatedData.hasOwnProperty("wind_direction") || !updatedData.hasOwnProperty("radiation") || !updatedData.hasOwnProperty("precipitation")) {
        res.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }

    if (state_s !== updatedData.state_s) { // Comprobar si el "state_s" de la URL es igual al "state_s" del cuerpo de la solicitud
        res.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }

    db.update({ state_s: state_s }, updatedData, {}, (err, numReplaced) => {
        if (err) {
            console.log(`Error updating resource ${state_s}: ${err}`);
            res.sendStatus(500);
        } else if (numReplaced === 0) {
            res.status(404).send({ error: "Recurso no encontrado" });
        } else {
            res.status(204).send("Recurso actualizado");
            console.log("Recurso actualizado: " + state_s);
        }
    });
});

app.put(BASE_API_URL + "/agrodata-almeria/:state_s",(req,res)=>{
    res.sendStatus(405, "Method not allowed");
});

};   

  


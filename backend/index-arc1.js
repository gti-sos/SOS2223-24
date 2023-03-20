var Datastore = require('nedb');
var db = new Datastore();
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/26061569/2s93JzMggQ";
const BASE_API_URL = "/api/v1";

var datos = [{state_s:"Almería",station_s	:"La Mojonera",year	:2000,day:31,temp_max:13.5,temp_min	:10.67,temp_average	:11.26},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:32,temp_max	:19.16,temp_min	:7.94,temp_average	:13.28},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:33,temp_max	:20.1,temp_min	:9.42,temp_average	:14.29},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:34,temp_max	:19.42,temp_min	:10.49,temp_average	:14.68},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:35,temp_max	:17.88,temp_min	:11.04,temp_average	:14.43},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:36,temp_max	:19.32,temp_min	:9.56,temp_average	:14.8},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:37,temp_max	:16.61,temp_min	:7.75,temp_average	:12.22},
{state_s	:"Huelva",station_s	:"La Mojonera",year	:2000,day	:38,temp_max	:20.84,temp_min	:8.88,temp_average	:13.96},
{state_s	:"Almería",station_s	:"La Mojonera",year	:2000,day	:39,temp_max	:19.23,temp_min	:10.16,temp_average	:14.42},
{state_s	:"Sevilla",station_s	:"La Mojonera",year	:2000,day	:40,temp_max	:19.83,temp_min	:10.29,temp_average	:14.68}
];



module.exports = (app) => {
        //Todos los GET
        app.get(BASE_API_URL+'/agrodata-almeria/docs', (req, res) => {
            console.log('Redirecting to documentation site of agrodata-almeria');
            res.status(301).redirect("https://documenter.getpostman.com/view/26061569/2s93JzMggQ");
        });
            //GET total y querys
        app.get(BASE_API_URL+'/agrodata-almeria', (req,res)=>{
            var year_query = req.query.year;
            var day_query = req.query.day;
            var state_s_query = req.query.state_s;
            var station_s_query = req.query.station_s;
            var temp_min = req.query.temp_min;
            var temp_max = req.query.temp_max;
            var temp_average = req.query.temp_average;    
            console.log(`New req to /agrodata-almeria.`);
                db.find({}, {_id: 0}, (error, docs) => {
                    if(error){
                        console.log(`Error getting agrodata-almeria.`);
                        res.sendStatus(500);
                    }else if(docs.length == 0){
                        console.log(`Agrodata not found`);
                        res.sendStatus(404);
                    }else{
                        let i = -1;
                        if(!req.query.offset){ 
                            var offset = -1;
                        }else{
                            var offset = parseInt(req.query.offset);
                        }
                        // Filtramos según las query
                        let datos = docs.filter((x) => {
                            return (((year_query == undefined)||(parseInt(year_query) === x.year))&&
                            ((day_query == undefined)||(parseInt(day_query) === x.day))&&
                            ((state_s_query == undefined)||(state_s_query === x.state_s))&&
                            ((station_s_query == undefined)||(station_s_query === x.station_s))&&
                            ((temp_min == undefined)||(parseFloat(temp_min) >= x.temp_min))&&
                            ((temp_max == undefined)||(parseFloat(temp_max) >= x.temp_max))&&
                            ((temp_average == undefined)||(parseFloat(temp_average) >= x.temp_average)))
                        }).filter((x) => {
                            // Paginación
                            i=i+1;
                            if(req.query.limit==undefined){ 
                                var cond = true;
                            }else{ 
                                var cond = (offset + parseInt(req.query.limit)) >= i;
                            }
                            return (i>offset)&&cond;
                        });
                        if(docs.length == 0){
                            console.log(`Agrodata-almeria not found`);
                            res.sendStatus(404);
                        }else{
                            console.log(`Data of agrodata-almeria returned: ${docs.length}`);
                            res.json(datos);
                        }
                    }
                })
            });
            //GET a recurso específico
        app.get(BASE_API_URL+'/agrodata-almeria/:year/:day/:state_s/:station_s', (req,res)=>{
            var year = req.params.year;
            var day = req.params.day;
            var state_s = req.params.state_s;
            var station_s = req.params.station_s;
            db.find({"year":parseInt(year),"day":parseInt(day),"state_s":state_s,"station_s":station_s},(err,docs)=>{
                if(err){
                    console.log(`Error getting agrodata-almeria/${year}/${day}/${state_s}/${station_s}: ${err}`)
                    res.sendStatus(500);
                }else if(docs.length == 0){
                    console.log(`agrodata-almeria/${year}/${day}/${state_s}/${station_s} not found`);
                    res.sendStatus(404);
                }else{
                    console.log(`Data of agrodata-almeria/${year}/${day}/${state_s}/${station_s} returned`);
                    res.json(docs.map((c) => {
                        delete c._id;
                        return(c);
                    }))
                }
            });
        });
            //GET para cargar datos
        app.get(BASE_API_URL+'/agrodata-almeria/loadInitialData', (req, res) => {
            console.log(`New req to /loadInitialData.`);
            db.find({}, async (err, docs) => {
                if(err){
                    console.log(`Error loading initial Data: ${err}.`);
                    res.sendStatus(500);
                }else if(docs.length=0){
                    console.log(`Data is already stored.`);
                    res.sendStatus(200);
                }else{
                    db.insert(datos);
                    console.log(`Inserted ${datos.length} data in the database.`);
                    res.sendStatus(201);
                }
            });
        });
        //Todos los DELETE
            //DELETE total
        app.delete(BASE_API_URL+"/agrodata-almeria", (req,res) => {
            console.log(`New DELETE total`);
            db.remove({},{multi:true},(err, numRemoved)=>{
                if(err){
                    console.log(`Error deleting agrodata-almeria`);
                    res.sendStatus(500);
                }else{
                    console.log(`Data removed ${numRemoved}`);
                    res.sendStatus(200);
                }
            });
        });
            //DELETE específico
        app.delete(BASE_API_URL+"/agrodata-almeria/:year/:day/:state_s/:station_s", (req,res) => {
            var day = req.params.day;
            var year = req.params.year;
            var state_s = req.params.state_s;
            var station_s = req.params.station_s;
            console.log(`New DELETE`);
            db.remove({"year":parseInt(year),"day":parseInt(day),"state_s":state_s,"station_s":station_s},{},(err, numRemoved)=>{
                if(err){
                    console.log(`Error deleting agrodata-almeria/${year}/${day}/${state_s}/${station_s}: ${err}`);
                    res.sendStatus(500);
                }else{
                    console.log(`Data removed ${numRemoved}`);
                    res.sendStatus(200);
                }
            });
        });

        //POST
        app.post(BASE_API_URL+"/agrodata-almeria", (req,res) => {
            var newData = req.body;
            console.log("New POST to /agrodata-almeria");           
            if(!newData.hasOwnProperty('year') || 
            !newData.hasOwnProperty('state_s') || 
            !newData.hasOwnProperty('station_s') ||
            !newData.hasOwnProperty('day') || 
            !newData.hasOwnProperty('temp_min') ||
            !newData.hasOwnProperty('temp_max') ||
            !newData.hasOwnProperty('temp_average')){
                console.log("Falta algún dato en el JSON")
                res.sendStatus(400)
            }else{
                db.find({'year': parseInt(newData.year),'day': parseInt(newData.day), 'state_s' : newData.state_s, 'station_s':newData.station_s}, (err, docs) =>{
                    if(err){
                        console.log(`Error getting agrodata-almeria/${year}/${day}/${state_s}/${station_s}: ${err}`);
                        res.sendStatus(500);
                    }else if(docs.length == 0){
                        //Modificamos el tipo de los valores al correcto
                        newData.year = parseInt(newData.year);
                        newData.day = parseInt(newData.day);
                        newData.temp_min = parseInt(newData.temp_min);
                        newData.temp_max = parseInt(newData.temp_max);
                        newData.temp_average = parseInt(newData.temp_average);

                        db.insert(newData);
    
                        console.log(BASE_API_URL+`/agrodata-almeria/${newData.year}/${newData.day}/${newData.state_s}`);
                        res.sendStatus(201);
    
                    
                    }else{ //Data.length no vacío, ya existe el recurso
                        //El recurso a crear ya existe, avisamos
                        console.log(`Data agrodata-almeria/${newData.year}/${newData.day}/${newData.state_s} already exist`);
                        res.sendStatus(409);
                    }
                });
            }
        });
            //POST NO PERMITIDO /agrodata-almeria/state_s/year/station_s
        app.post(BASE_API_URL+"/agrodata-almeria/:year/:state_s/:station_s", (req, res) => {
            console.log('Metodo no permitido');
            res.sendStatus(405);
        });
        //PUT
            //PUT bueno
        app.put(BASE_API_URL+"/agrodata-almeria/:year/:day/:state_s/:station_s", (req, res) => {
            var year = req.params.year;
            var day = req.params.day;
            var state_s = req.params.state_s;
            var station_s = req.params.station_s;
            let newData = req.body;
    
            if(!newData.hasOwnProperty('year') || 
            !newData.hasOwnProperty('state_s') ||
            !newData.hasOwnProperty('station_s') || 
            !newData.hasOwnProperty('day') ||
            !newData.hasOwnProperty('temp_min') || 
            !newData.hasOwnProperty('temp_max') ||
            !newData.hasOwnProperty('temp_average')){
                console.log('Falta algun dato');
                res.sendStatus(400);
            
            //Si todos los campos están presentes
            }else{
                //Comprobamos que la query y el body coinciden
                if(newData.year != year || newData.day != day || newData.state_s != state_s || newData.station_s != station_s){
                    console.log('Los datos no coinciden');
                    res.sendStatus(400);
    
                }else{
                    //Vamos a modificar solo si existe, para ellos buscamos el recurso
                    db.find({'year': parseInt(year),'day': parseInt(day), 'state_s' : state_s, 'station_s':station_s}, (err, docs) => {
                        if(err){
                            //Error al buscar si existe dicho recurso
                            console.log(`Error getting agrodata-almeria/${year}/${day}/${state_s}/${station_s}: ${err}`);
                            res.sendStatus(500); 
                        //No hay errores, modificar si existe el dato:
                        }else if(docs.length !== 0){
                            //Modificamos el tipo de los valores al correcto
                            newData.year = parseInt(newData.year);
                            newData.day = parseInt(newData.day);
                            newData.temp_min = parseInt(newData.temp_min);
                            newData.temp_max = parseInt(newData.temp_max);
                            newData.temp_average = parseInt(newData.temp_average);
    
                            //Guardamos el nuevo dato
                            db.update({'year': parseInt(year),'day': parseInt(day), 'state_s' : state_s, 'station_s':station_s}, newData, {}, (err, num) => {
                                if(err){
                                    console.log(`Error updating ${BASE_API_URL} "/agrodata-almeria/${year}/${day}/${state_s}/${station_s}`);
                                    res.sendStatus(500);
                                }else{
                                    console.log(`Correctly Updated ${BASE_API_URL} "/agrodata-almeria/${year}/${day}/${state_s}/${station_s}`);
                                    res.sendStatus(200);
                                }
                            }); 
                        }else{ //Data.length vacío, no existe el recurso
                            console.log(`Data agrodata-almeria/${year}/${day}/${state_s}/${station_s} not exist`);
                            res.sendStatus(404);
                        }
                    
                    });
                }
            }
        });

            //PUT no permitido
        app.put(BASE_API_URL+'/agrodata-almeria', (req, res) => {
            console.log('Metodo no permitido');
            res.sendStatus(405);
        });
            //PUT no permitido
        app.put(BASE_API_URL+'/agrodata-almeria/:year', (req, res) => {
            console.log('Metodo no permitido');
            res.sendStatus(405);
        });
        app.put(BASE_API_URL+'/agrodata-almeria/:year/:day', (req, res) => {
            console.log('Metodo no permitido');
            res.sendStatus(405);
        });
            //PUT no permitido
        app.put(BASE_API_URL+'/agrodata-almeria/:year/:day/:state_s', (req, res) => {
            console.log('Metodo no permitido');
            res.sendStatus(405);
        });
    }

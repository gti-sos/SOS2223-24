var Datastore = require('nedb');
var db = new Datastore();
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/26061569/2s93JzMggQ";
const BASE_API_URL = "/api/v1";

var datosFichero = [{state_s:"Almería",station_s	:"La Mojonera",year	:2000,day:31,temp_max:13.5,temp_min	:10.67,temp_average	:11.26},
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



//CODIGO

app.get(BASE_API_URL+"/agrodata-almeria", (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  db.find({}, (err, agrodata)=>{
      if (from && to && !err) {
          const provinciasAño = agrodata.filter(x => {return x.year >= from && x.year <= to}); 
          if (from >= to) {
              res.status(400).json("El rango de años especificado es inválido");
          
          }else{
              res.status(200);
              res.json(provinciasAño.map((c)=>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /agrodata?from=${from}&to=${to}`); 
          }
      }else if(!err){
          const year = req.query.year;
          const day = req.query.day;
          const state_s = req.query.state_s;
          const station_s = req.query.station_s;
          const temp_max = req.query.temp_max;
          const temp_min = req.query.temp_min;
          const temp_average = req.query.temp_average;
          const limit = req.query.limit;
          const offset = req.query.offset;
          
          if(limit && offset){ 
              const filtradas = pagination(req,agrodata);
              console.log("Nuevo GET en /agrodata con paginación");  
              res.status(200);
              res.json(filtradas.map((c)=>{
              delete c._id;
              return c;
              }));

            }else if(state_s && station_s && year && day && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.station_s ==station_s && r.year == year && r.day == parseInt(day) && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia,estacion, año,dia, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }  
            
            }else if(state_s && station_s && year && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.station_s ==station_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia,estacion, año, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(state_s && station_s && day && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.station_s ==station_s && r.day == day && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia,estacion, dia, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(state_s && day && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.day == day && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, dia, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.day == day && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con dia, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, año, temperaturas maxima, minima y media");  
              res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
            }else if(station_s && year && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, año, temperaturas maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year && temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con provincia, año, temperatura maxima y minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(station_s && year && temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con estacion, año, temperatura maxima y minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year && temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, año, temperatura maxima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          
            }else if(station_s && year && temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_max >= temp_max
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, año, temperatura maxima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

          }else if(state_s && year && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_min >= temp_min
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, año, temperatura minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && year && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_min >= temp_min
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, año, temperatura minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }   

          }else if(state_s && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_max >= temp_max && 
                  r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, temperatura maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_max >= temp_max && 
                  r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, temperatura maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

          }else if(year && temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_max >= temp_max && r.temp_min >= temp_min
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con año, temperatura maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year && temp_max){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con provincia, año y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && year && temp_max){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con estacion, año y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

          }else if(state_s && year && temp_min){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con provincia, año y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && year && temp_min){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con estacion, año y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, año y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && year && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, año y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

          }else if(state_s && temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_max >= temp_max && 
                  r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con provincia, temperatura maxima y minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(station_s && temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_max >= temp_max && 
                  r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con estacion, temperatura maxima y minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_max >= temp_max && 
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, temperatura maxima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(station_s && temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_max >= temp_max && 
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, temperatura maxima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_min >= temp_min &&
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia, temperatura minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(station_s && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_min >= temp_min &&
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion, temperatura minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_max >= temp_max &&
                  r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con año, temperatura maxima y minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_max >= temp_max &&
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con año, temperatura maxima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_min >= temp_min &&
                  r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con año, temperatura minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_max && temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.temp_max >= temp_max && r.temp_min >= temp_min
                  && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con temperatura maxima, minima y media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && year){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.year == year);
              console.log("Nuevo GET en /agrodata con provincia y año");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(station_s && year){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.year == year);
              console.log("Nuevo GET en /agrodata con estacion y año");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && temp_max){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con provincia y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && temp_min){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con provincia y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(state_s && temp_average){
              const filtradas = agrodata.filter(r => r.state_s == state_s && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con provincia y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(station_s && temp_max){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con estacion y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(station_s && temp_min){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con estacion y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(station_s && temp_average){
              const filtradas = agrodata.filter(r => r.station_s == station_s && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con estacion y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_max){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con año y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_min){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con año y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(year && temp_average){
              const filtradas = agrodata.filter(r => r.year == year && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con año y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }


            }else if(day && temp_max){
              const filtradas = agrodata.filter(r => r.day == day && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con dia y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(day && temp_min){
              const filtradas = agrodata.filter(r => r.day == day && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con dia y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(day && temp_average){
              const filtradas = agrodata.filter(r => r.day == day && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con dia y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

            }else if(day && state_s){
              const filtradas = agrodata.filter(r => r.day == day && r.state_s == state_s);
              console.log("Nuevo GET en /agrodata con dia y provincia");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && station_s){
              const filtradas = agrodata.filter(r => r.day == day && r.station_s == station_s);
              console.log("Nuevo GET en /agrodata con dia y estacion");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && station_s && state_s){
              const filtradas = agrodata.filter(r => r.day == day && r.station_s == station_s && r.state_s == state_s);
              console.log("Nuevo GET en /agrodata con dia,estacion y provincia");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && station_s && temp_average){
              const filtradas = agrodata.filter(r => r.day == day && r.station_s == station_s && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con dia,estacion y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && state_s && temp_average){
              const filtradas = agrodata.filter(r => r.day == day && r.state_s == state_s && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con dia,provincia y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && state_s && temp_max){
              const filtradas = agrodata.filter(r => r.day == day && r.state_s == state_s && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con dia,provincia y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && station_s && temp_max){
              const filtradas = agrodata.filter(r => r.day == day && r.station_s == station_s && r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con dia,provincia y temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && state_s && temp_min){
              const filtradas = agrodata.filter(r => r.day == day && r.state_s == state_s && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con dia,provincia y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day && station_s && temp_min){
              const filtradas = agrodata.filter(r => r.day == day && r.station_s == station_s && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con dia,provincia y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }

          }else if(temp_max && temp_min){
              const filtradas = agrodata.filter(r => r.temp_max >= temp_max && r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con temperatura maxima y temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_max && temp_average){
              const filtradas = agrodata.filter(r => r.temp_max >= temp_max && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con temperatura maxima y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_min && temp_average){
              const filtradas = agrodata.filter(r => r.temp_min >= temp_min && r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con temperatura minima y temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if (year) {
              const filtradas = agrodata.filter(r => r.year === parseInt(year));
              console.log("Nuevo GET en /agrodata con año");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
              
          } else if(state_s){
              const filtradas = agrodata.filter(r => r.state_s === state_s);
              console.log("Nuevo GET en /agrodata con provincia");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            } else if(station_s){
              const filtradas = agrodata.filter(r => r.station_s === station_s);
              console.log("Nuevo GET en /agrodata con provincia");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_max){
              const filtradas = agrodata.filter(r => r.temp_max >= temp_max);
              console.log("Nuevo GET en /agrodata con temperatura maxima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_min){
              const filtradas = agrodata.filter(r => r.temp_min >= temp_min);
              console.log("Nuevo GET en /agrodata con temperatura minima");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else if(temp_average){
              const filtradas = agrodata.filter(r => r.temp_average >= temp_average);
              console.log("Nuevo GET en /agrodata con temperatura media");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
            }else if(day){
              const filtradas = agrodata.filter(r => r.day >= day);
              console.log("Nuevo GET en /agrodata con dia");  
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }else {
              console.log("Nuevo GET en /agrodata"); 
              if(filtradas.length==0){
                res.status(404).send("Not Found")
              } else{
                res.status(200);
              res.json(filtradas.map((c)=>{
                  delete c._id;
                  return c;
              }));
              }
          }  
      }else{
          console.log("Error al dar los datos");
          res.sendStatus(500);
      }
  });
  console.log("GET con los datos");
});

// Paginacion
function pagination(req, lista){
  var res = [];
  const limit = req.query.limit;
  const offset = req.query.offset;
  
  if(limit < 1 || offset < 0 || offset > lista.length){
      res.push("Hay un error en los parametros offset y limit");
      return res;
  }else{
  res = lista.slice(offset,parseInt(limit)+parseInt(offset));
  return res;
  }     
};


app.get(BASE_API_URL+"/agrodata/:state_s", (request, response) => {
  const state_s = request.params.state_s;
  const from = request.query.from;
  const to = request.query.to;
  db.find({}, (err, agrodata)=>{
      if (from && to && !err) {
          if (from > to) {
              response.status(400).json("El rango de años especificado es inválido");
          } else {
              const datosFiltrados = agrodata.filter(x => x.state_s === state_s && x.year >= from && x.year <= to);
              response.status(200).json(datosFiltrados.map((c) =>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /agrodata/${state_s}?from=${from}&to=${to}`);
          }
      }else if(!err){
          const datosFiltrados = agrodata.filter(x => x.state_s == state_s);
          
          if(datosFiltrados.length == 0){
              res.status(404).json('La ruta solicitada no existe');
          }else{
          response.status(200).json(datosFiltrados.map((c)=>{
              delete c._id;
              return c;
          }));
          console.log(`New GET /agrodata/${state_s}`); 
          }
          console.log(`Nuevo GET en /agrodata/${state_s}`); 
      }else{
          response.sendStatus(500);
          console.log("No se ha podido hacer la busqueda");
      }
  });    
});

/// CODIGO


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


app.get(BASE_API_URL+"/agrodata-almeria/:state_s/:year", (req,res) => {
  const state_s = req.params.state_s;
  const year = parseInt(req.params.year);
  db.find({}, (err, agrodata)=>{
      if(!err){
          var filtro = agrodata.filter(x => x.state_s == state_s && x.year == year);
          if (filtro.length == 0) {            
              res.status(404).json('La ruta solicitada no existe');
          } else {
              res.status(200).json(filtro.map((c)=>{
                  delete c._id;
                  return c;
              }));
          }
      }else{
          console.log("No se ha podido obtener los datos");
          res.sendStatus(500);
      }   
  });
  console.log("Datos de /agrodata-almeria/:state_s/:year");
});

app.get(BASE_API_URL+"/agrodata-almeria/:state_s", (request, response) => {
  const state_s = request.params.state_s;
  const from = request.query.from;
  const to = request.query.to;
  db.find({}, (err, agrodata)=>{
      if (from && to && !err) {
          if (from > to) {
              response.status(400).json("El rango de años especificado es inválido");
          } else {
              const datosFiltrados = agrodata.filter(x => x.state_s === state_s && x.year >= from && x.year <= to);
              response.status(200).json(datosFiltrados.map((c) =>{
                  delete c._id;
                  return c;
              }));
              console.log(`/GET en /agrodata-almeria1/${state_s}?from=${from}&to=${to}`);
          }
      }else if(!err){
          const datosFiltrados = agrodata.filter(x => x.state_s == state_s);
          
          if(datosFiltrados.length == 0){
              res.status(404).json('La ruta solicitada no existe');
          }else{
          response.status(200).json(datosFiltrados.map((c)=>{
              delete c._id;
              return c;
          }));
          console.log(`New GET /agrodata-almeria/${state_s}`); 
          }
          console.log(`Nuevo GET en /agrodata-almeria/${state_s}`); 
      }else{
          response.sendStatus(500);
          console.log("No se ha podido hacer la busqueda");
      }
  });    
});

  
app.post(BASE_API_URL + "/agrodata-almeria", (req, res) => {
    const newRecord = req.body;
    
    if (
      !newRecord.hasOwnProperty("state_s") ||
      !newRecord.hasOwnProperty("station_s") ||
      !newRecord.hasOwnProperty("year") ||
      !newRecord.hasOwnProperty("day") ||
      !newRecord.hasOwnProperty("temp_max") ||
      !newRecord.hasOwnProperty("temp_min") ||
      !newRecord.hasOwnProperty("temp_average")
    ) {
      res.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
      return;
    };
    
    db.findOne(
      {
        state_s: newRecord.state_s,
        station_s: newRecord.station_s,
        year: newRecord.year,
        day: newRecord.day,
        temp_max: newRecord.temp_max,
        temp_min: newRecord.temp_min,
        temp_average: newRecord.temp_average,
      },
      (err, resource) => {
        if (err) {
          console.log(`Error getting resource ${newRecord.state_s}: ${err}`);
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
    if (!updatedData.hasOwnProperty("station_s") || !updatedData.hasOwnProperty("year") || !updatedData.hasOwnProperty("day") || !updatedData.hasOwnProperty("temp_max")|| !updatedData.hasOwnProperty("temp_min")|| !updatedData.hasOwnProperty("temp_average")) {
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

  


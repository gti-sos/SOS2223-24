var express = require("express");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 12345;
app.use(bodyParser.json());

var useOUA = require("./Samples/OUA");
var useARC = require("./Samples/ARC");
var useVSE = require("./Samples/VSE");


const BASE_API_URL = "/api/v1";

app.get("/cool", (request,response) =>{
    response.send(cool());
    console.log("New request");
});

/*
app.get("/samples/ARC", (req,res) =>{
  let result=media_ARC("Almería")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});
*/
app.get("/Samples/ARC", useARC.media_ARC);

/*
app.get("/samples/OUA", (req,res) =>{
  let result=media_OUA("Sevilla")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});
*/

app.get("/Samples/OUA", useOUA.media_oua);

/*
app.get("/samples/VSE", (req,res) =>{
  let result=media_VSE("CO-Córdoba")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});
*/
app.get("/Samples/VSE", useVSE.media_VSE);

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});

//Get Adolfo
app.get(BASE_API_URL + "/agrodata-almeria/", (req, res) => {
  res.json(useARC.miArray_ARC);
  console.log("New GET to /agrodata-almeria")
});

//Metodo Get loadInitialData

app.get(BASE_API_URL + "/agrodata-almeria/loadInitialData", (req, res) => {
  if (useARC.miArray_ARC.length==0){
    useARC.miArray_ARC.push({state_id:4,state_s:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"31/01/2000",day	:31,temp_max:13.5,hormin_temp_max	:1736,temp_min	:10.67,hormin_temp_min	:2135,temp_average	:11.26,hum_max	:91.9,hum_min	:73.8,hum_average	:83.5,wind_speed:596,wind_direction:317.3,radiation:2,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"01/02/2000",day	:32,temp_max	:19.16,hormin_temp_max	:1411,temp_min	:7.94,hormin_temp_min	:147,temp_average	:13.28,hum_max	:98.5,hum_min	:47.41,hum_average	:80.5,wind_speed:967,wind_direction:273,radiation:11.76,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"02/02/2000",day	:33,temp_max	:20.1,hormin_temp_max	:1305,temp_min	:9.42,hormin_temp_min	:651,temp_average	:14.29,hum_max	:98.6,hum_min	:50.03,hum_average	:80.8,wind_speed:1.179,wind_direction:61.06,radiation:13.18,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"03/02/2000",day	:34,temp_max	:19.42,hormin_temp_max	:1332,temp_min	:10.49,hormin_temp_min	:530,temp_average	:14.68,hum_max	:91.7,hum_min	:53,hum_average	    :68.89,wind_speed:1.058,wind_direction:337.2,radiation:13.33,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"04/02/2000",day	:35,temp_max	:17.88,hormin_temp_max	:1336,temp_min	:11.04,hormin_temp_min	:430,temp_average	:14.43,hum_max	:92.2,hum_min	:18.54,hum_average	:58.5,wind_speed:2.325,wind_direction:50.62,radiation:14.11,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"05/02/2000",day	:36,temp_max	:19.32,hormin_temp_max	:959,temp_min	:9.56,hormin_temp_min	:2338,temp_average	:14.8,hum_max	:81.6,hum_min	:11.57,hum_average	:37.77,wind_speed:2.89,wind_direction:56.1,radiation:14.4,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"06/02/2000",day	:37,temp_max	:16.61,hormin_temp_max	:1254,temp_min	:7.75,hormin_temp_min	:451,temp_average	:12.22,hum_max	:94.9,hum_min	:43.88,hum_average	:65.21,wind_speed:1.571,wind_direction:302.5,radiation:13.91,precipitation:0},
    {state_id	:2,state_s	:"Huelva",station_id	:3,station_s	:"La Mojonera",date	:"07/02/2000",day	:38,temp_max	:20.84,hormin_temp_max	:1351,temp_min	:8.88,hormin_temp_min	:646,temp_average	:13.96,hum_max	:95.9,hum_min	:25.49,hum_average	:72.2,wind_speed:1.294,wind_direction:37.55,radiation:13.85,precipitation:0},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"08/02/2000",day	:39,temp_max	:19.23,hormin_temp_max	:1405,temp_min	:10.16,hormin_temp_min	:435,temp_average	:14.42,hum_max	:91,hum_min	    :43.25,hum_average	:66.2,wind_speed:1.152,wind_direction:287,radiation:12.47,precipitation:0},
    {state_id	:3,state_s	:"Sevilla",station_id	:2,station_s	:"La Mojonera",date	:"09/02/2000",day	:40,temp_max	:19.83,hormin_temp_max	:1355,temp_min	:10.29,hormin_temp_min	:609,temp_average	:14.68,hum_max	:94.9,hum_min	:36.78,hum_average	:66.35,wind_speed:1.676,wind_direction:60.25,radiation:13.9,precipitation:0}
    );
    res.json(useARC.miArray_ARC)
    console.log("Se han creado 10 datos")

} else {
  res.send('Ya existen datos');
    console.log('Ya existen datos')
}
});

//Metodo GET recurso especifico

app.get(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
  const state_s = req.params.state_s;
  const resourse = useARC.miArray_ARC.find(resourse => resourse.state_s === state_s)
  if (resourse){
    res.json(resourse);
  }else {
    res.status(404).json({error:"Recurso no encontrado" })
  }

});

//Metodo Post en URL base Adolfo

app.post(BASE_API_URL + "/agrodata-almeria", (req,res) => {
  const keys = Object.keys(req.body);
  if(keys.length<18){
    res.status(400).send("No se han introducido datos suficientes");
  } else{
    const exists = useARC.miArray_ARC.some(agro => agro.state_id === req.body.state_id && agro.date === req.body.date)
    if (exists) {
      // Enviar una respuesta con un código de estado 409 Conflict si el objeto ya existe
      res.status(409).send('Conflicto: Este objeto ya existe');
    } else {
      // Agregar los nuevos datos a la variable
      useARC.miArray_ARC.push(req.body);
      // Enviar una respuesta con un código de estado 201 Created
      res.status(201).send('Los datos se han creado correctamente');
    }
  }
  });

  // Metodo PUT en URL base Adolfo
app.put(BASE_API_URL + "/agrodata-almeria", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el metodo PUT');
});

// Método DELETE en URL base Adolfo
app.delete(BASE_API_URL + "/agrodata-almeria", (req, res) => {
  useARC.miArray_ARC = [];
  res.status(200).send('Se han borrado los datos');
});

//Metodo delete recurso especifico

app.delete(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
  const state_s =req.params.state_s;
  const index=useARC.miArray_ARC.findIndex(item => item.state_s === state_s);
  console.log("New Delete");
  if (index!==-1){
    useARC.miArray_ARC.splice(index, 1);
    res.status(204).send("Se ha eliminado correctamente");
  }else{
    res.status(404).send({error : "No se encontro el elemento"});
  }
});

//Metodo Post en recurso especifico
app.post(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el metodo POST');
});

//Metodo get en loadInitialData Adolfo

app.get(BASE_API_URL + "/agrodata-almeria/loadInitialData", (req, res) => {
  res.json(useARC.miArray_ARC);
  res.status(200);
});

//Metodo Put en recurso especifico
app.put(BASE_API_URL + "/agrodata-almeria/:state_s", (req, res) => {
const state_s = req.params.state_s;
const updateStat = req.body;
if(!updateStat.hasOwnProperty("state_s")){
  res.status(400).send({error : "El Objeto Json no tiene los campos esperados"});
  return;
}if(state_s !== updateStat.state_s){
  res.status(400).send({error : "El ID del recurso no coincide"});
  return;
}
const index = useARC.miArray_ARC.findIndex(stat => stat.state_s == state_s);
if (index !== -1) {
  useARC.miArray_ARC[index]= updateStat;
  res.sendStatus(204);
  console.log("Recurso actualizado correctamente" + state_s);
  
}else{
  res.status(404).send({error: "Recurso no encontado"});
}
});

//Metodo delete Addolfo
app.delete(BASE_API_URL + "/agrodata-almeria/loadInitialData", (req, res) => {
  useARC.miArray_ARC = [];
  res.status(200).send('Los datos se han borrado correctamente');
});




//F05 OUAEL

//Get OUAEL
app.get(BASE_API_URL + "/provisions-for-the-year-2014", (req, res) => {
  res.send(JSON.stringify(useOUA.datos_oua, null, 2));
  console.log("New GET to /provisions-for-the-year-2014");
});
//load Initial Data OUAEL
var datos= [];
app.get(BASE_API_URL + "/provisions-for-the-year-2014/loadInitialData", (req, res) => {
  if (datos.length==0){
    datos.push({province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},	
    {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
    {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
    {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
    {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
    {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
    {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},		
    {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"26/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
    {province:"Sevilla",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"19/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
    {province:"Sevilla",summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"10/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"}
    );
    res.send(JSON.stringify(useOUA.datos_oua, null, 2));
    console.log("Se han creado 10 datos")

} else {
  res.send('Ya existen datos');
    console.log('Ya existen datos')
}
});


//Metodo Post en URL base OUAEL
app.post(BASE_API_URL + "/provisions-for-the-year-2014", (req,res) => {
  const keys1 = Object.keys(req.body);
  console.log("claves " + keys1.length);
  if(keys1.length!==11){
    res.status(400).send("No se han introducido datos suficientes");
  } else{
    const exists = useOUA.datos_oua.some(pr => pr.disposal_number === req.body.disposal_number && pr.date_of_publication === req.body.date_of_publication)
    if (exists) {
      // Enviar una respuesta con un código de estado 409 Conflict si el objeto ya existe
      res.status(409).send('Conflicto: Este objeto ya existe');
    } else {
      // Agregar los nuevos datos a la variable
      useOUA.datos_oua.push(req.body);
      // Enviar una respuesta con un código de estado 201 Created
      res.status(201).send('Los datos se han creado correctamente');
    }
  }
  });

  // Metodo PUT en URL base Ouael
app.put(BASE_API_URL + "/provisions-for-the-year-2014/", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el método PUT');
});

// GET PROVINCE
app.get(BASE_API_URL + "/provisions-for-the-year-2014/:province", (request, response) => {
  const province = request.params.province;
  const provinceStats = useOUA.datos_oua.filter((dato) => dato.province === province);
  //response.json(territoryStats);
  console.log(`New GET to /provisions-for-the-year-2014/${province}`);

  if (provinceStats.length === 0) {
      console.log(`provisions for province ${province} not found`);
      response.sendStatus(404);
  } else {
      response.json(provinceStats);
      console.log(`New GET to /provisions-for-the-year-2014/${province}`);
  }
});

  /** Post con un Province bloqueado  */
  app.post("/api/v1/provisions-for-the-year-2014/:province", (req,res) => {
    res.sendStatus(409);
});


/** Put con un ID (province) */
app.put("/api/v1/provisions-for-the-year-2014/:disposal_number", (req,res) => {
  let exist = useOUA.datos_oua.find(x=>x.disposal_number == req.params.disposal_number)
  if(exist==undefined){
      res.sendStatus(400);
  }
  if(req.params.disposal_number != req.body.disposal_number){
      res.sendStatus(400);
  }
									
  exist.province=req.body.province;
  exist.summary=req.body.summary;
  exist.type_of_provision=req.body.type_of_provision;
  exist.disposal_number=req.body.disposal_number;
  exist.number_of_the_Bulletin=req.body.number_of_the_Bulletin;
  exist.date_of_the_bulletin=req.body.date_of_the_bulletin;
  exist.date_of_disposition=req.body.date_of_disposition;
  exist.section_number=req.body.section_number;
  exist.section=req.body.section;
  exist.date_of_publication=req.body.date_of_publication;
  exist.subsection=req.body.subsection;

  res.sendStatus(200);
});

 /** Delete con province */
 app.delete("/api/v1/provisions-for-the-year-2014/:province", (req,res) => { 

  //check if exist
  let exist = useOUA.datos_oua.find(x=>x.province == req.params.province)
  if(exist == undefined){
      res.sendStatus(404);
  }else{
      useOUA.datos_oua = useOUA.datos_oua.filter(x=> x.province != req.params.province);
      res.sendStatus(200);
  }
});


// Método DELETE en URL base Ouael
app.delete(BASE_API_URL + "/provisions-for-the-year-2014", (req, res) => {
  array = [];
  res.status(200).send('Se han borrado los datos');
});

//Metodo Post en loadInitialData Bloqueado Ouael
app.post(BASE_API_URL + "/provisions-for-the-year-2014/loadInitialData", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el método POST');
});

//Metodo get en loadInitialData Ouael
app.get(BASE_API_URL + "/provisions-for-the-year-2014/loadInitialData", (req, res) => {
  res.json(useOUA.datos_oua);
  res.status(200);
});

//Metodo Put en loadInitialData Ouael
app.put(BASE_API_URL + "/provisions-for-the-year-2014/loadInitialData", (req, res) => {
if (!req.body) {
  res.status(400).send('No se proporcionaron datos');
} else {
  datos = req.body;
  res.status(200).send('Los datos se han actualizado correctamente');
}
});

//Metodo delete en loadInitialData Ouael
app.delete(BASE_API_URL + "/provisions-for-the-year-2014/loadInitialData", (req, res) => {
  datos = [];
  res.status(200).send('Los datos se han borrado correctamente');
});



//Get Victor
app.get(BASE_API_URL + "/agroprices-weekly/", (req, res) => {
  res.json(useVSE.array_VSE);
  console.log("New GET to /agroprices-weekly")
});

//Get Victor recurso especifico
//GET recurso especifico
app.get(BASE_API_URL+"/agroprices-weekly/:market",(req,res)=>{
  const marketurl = req.params.market; // Obtener el parámetro del mercado de la URL
  const resourceMarket = useVSE.array_VSE.find(resourceMarket => resourceMarket.market === marketurl); // Buscar el recurso por territorio

  if (resourceMarket) {
      res.json(resourceMarket); // Devolver el recurso con una respuesta HTTP 200
  } else {
      res.status(404).json({error: "Recurso no encontrado"}); // Devolver un error HTTP 404 si no se encuentra el recurso
  }
});


//Array vacio + get Victor
var array_10= [];

app.get(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
  if (array_10.length==0){
    array_10.push({product: "REFINADO",type: "Aceites de girasol",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 77.53,week2: 76.55},
    {product: "REFINADO",type: "Aceites de girasol",class: "S.E.",unit: "100 kg",market: "SE-Sevilla",commpos: "A.I.",week1: 80.00,week2: 79.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Montes Orientales",commpos: "A.I.",week1: 180.00,week2: 180.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Alhama",commpos: "A.I.",week1: 140.00,week2: 140.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Montes Orientales",commpos: "A.I.",week1: 179.00,week2: 180.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "CA-Cádiz",commpos: "A.I.",week1: 174.00,week2: 174.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "HU-Huelva",commpos: "A.I.",week1: 210.00,week2: 210.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Granada",commpos: "A.I.",week1: 159.00,week2: 168.00},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 172.80,week2: 172.80},
    {product: "VÍRGENES-LAMPANTE (2 g)",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "MA-Málaga",commpos: "A.I.",week1: 172.20,week2: 176.30}
    );
    res.json(array_10)
    console.log("Se han creado 10 datos")

} else {
  res.send('Ya existen datos');
    console.log('Ya existen datos')
}
});

//Metodo Post de recurso(fallido) Victor
//POST FALLIDO
app.post(BASE_API_URL+"/agroprices-weekly/:product",(req,res)=>{
  res.sendStatus(405, "Method not allowed");
  console.log("New post /agroprices-weekly/:product");
});

//Metodo Post en URL base Victor

app.post(BASE_API_URL + "/agroprices-weekly", (req,res) => {
  const keys = Object.keys(req.body);
  if(keys.length<8){
    res.status(400).send("No se han introducido datos suficientes");
  } else{
    const exists = useVSE.array_VSE.some(agro => agro.product === req.body.product && agro.market === req.body.market)
    if (exists) {
      // Enviar una respuesta con un código de estado 409 Conflict si el objeto ya existe
      res.status(409).send('Conflicto: Este objeto ya existe');
    } else {
      // Agregar los nuevos datos a la variable
      useVSE.array_VSE.push(req.body);
      // Enviar una respuesta con un código de estado 201 Created
      res.status(201).send('Los datos se han creado correctamente');
    }
  }
  });

  // Metodo PUT en URL base Victor
app.put(BASE_API_URL + "/agroprices-weekly", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el metodo PUT');
});

// Método DELETE en URL base Victor
app.delete(BASE_API_URL + "/agroprices-weekly", (req, res) => {
  useVSE.array_VSE = [];
  res.status(200).send('Se han borrado los datos');
});

//Metodo delete recurso especifico Victor
//DELETE  DE UN RECURSO
app.delete(BASE_API_URL + "/agroprices-weekly/:market", (request, response) => {
  const market = request.params.market;
  const index = useVSE.array_VSE.findIndex(item => item.market === market); // Encontrar el índice del elemento a eliminar
  if (index !== -1) { // Comprobar si se encontró el elemento
    useVSE.splice(index, 1); // Eliminar el elemento en el índice encontrado
    response.status(204).send("Se ha eliminado correctamente"); // Enviar una respuesta vacía con el código 204 (No Content) para indicar éxito sin contenido
  } else {
    response.status(404).send({ error: "No se encontró el elemento con el territorio especificado" }); // Enviar una respuesta con el código 404 (Not Found) si el elemento no se encontró
  }
});

//Metodo Post en loadInitialData Bloqueado Victor
app.get(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
  res.status(405).send('En esta ruta no esta permitido el metodo POST');
});

//Metodo get en loadInitialData Victor

app.get(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
  res.json(array_10);
  res.status(200);
});

//Metodo Put en loadInitialData Victor
app.put(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
if (!req.body) {
  res.status(400).send('No se proporcionaron datos');
} else {
  array_10 = req.body;
  res.status(200).send('Los datos se han actualizado correctamente');
}
});

//Metodo put para actualizar recurso Victor
// PUT actualizar recurso existente
app.put(BASE_API_URL + "/agroprices-weekly/:market", (request, response) => {
  const market = request.params.market; // Obtener el territorio de la URL
  const updatedStat = request.body; // Obtener los nuevos datos del cuerpo de la solicitud
  if (!updatedStat.hasOwnProperty("market")) { // Comprobar si el cuerpo de la solicitud contiene el campo "market"
      response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
      return;
  }
  if (market !== updatedStat.market) { // Comprobar si el "territory" de la URL es igual al "territory" del cuerpo de la solicitud
      response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
      return;
  }
  const index = useVSE.array_VSE.findIndex(stat => stat.market === market); // Encontrar el índice del recurso a actualizar
  if (index !== -1) {
      useVSE.array_VSE[index] = updatedStat; // Actualizar el recurso en la posición encontrada
      response.sendStatus(204); // Enviar una respuesta vacía con código de estado 204 (Actualización exitosa)
      console.log("Recurso actualizado: " + market);
  } else {
      response.status(404).send({ error: "Recurso no encontrado" }); // Si no se encuentra el recurso, devolver un código de estado 404
  }
});

//Metodo delete en loadInitialData Victor
app.delete(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
  array_10 = [];
  res.status(200).send('Los datos se han borrado correctamente');
});
var express = require("express");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 12345;

app.use("/", express.static("./public"));

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

app.get("/Samples/OUA", useOUA.media_OUA);

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

const rutaoua = "/api/v1/provisions-for-the-year-2014";
var datos = [];

//OUAEL
/*--------------------------------------GET------------------------------------------------------- */
//load Initial Data OUAEL
app.get(rutaoua + "/loadInitialData", (req, res) => {
    if (datos.length==0){
    datos.push({province:"Jaen" ,year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},	
    {province:"Jaen" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
    {province:"Sevilla" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
    {province:"Cordoba" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
    {province:"Granada"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
    {province:"Almeria"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
    {province:"Sevilla" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_disposition:"28/11/2013",section_number:5,section:"Anuncios"},		
    {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_disposition:"11/12/2013",section_number:5,section:"Anuncios"},	
    {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_disposition:"15/11/2013",section_number:5,section:"Anuncios"},	
    {province:"Sevilla" , year: 2013, summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_disposition:"27/12/2013",section_number:5,section:"Anuncios"}
    );
    res.send(JSON.stringify(datos, null, 2));
    console.log("Se han creado 10 datos")

    }else {
        res.send('Ya existen datos');
        console.log('Ya existen datos');
}
    console.log("New GET to /provisions-for-the-year-2014/loadInitialData");
});

//GET and GET from & to
app.get(rutaoua, (req, res) => {
    if (datos) {
      const from = Number(req.query.from);
      const to = Number(req.query.to);
      const year = Number(req.query.year)
      if (from && to) {
        const yearSelect = datos.filter(x => x.year >= from && x.year <= to);
          if (from >= to) {
              res.status(400).send("El rango es incorrecto");
          } else {
              if(yearSelect.length !== 0){
                res.status(200).json(yearSelect);
                console.log(`New GET to /provisions-for-the-year-2014/?from=${from}&to=${to}`);
              }
              else{
                res.status(404).send(`No existe ningún recurso en el periodo ${from}-${to}.`)
              }
          }
      }
      else if(year){
        const yearSelect = datos.filter(x=> x.year === year);
        if(yearSelect.length === 0){
          res.status(404).send(`No exite ningun dato para el año ${year}`);
        }
        else{
          res.status(200).json(yearSelect);
          console.log(`New GET to /provisions-for-the-year-2014?year=${year}`);
        }
      }
      else{
        if(datos.length !== 0){
          res.json(datos).status(200);
          console.log("New GET to /provisions-for-the-year-2014/");
        }
        else {
          res.status(404).json({ message: `No existe ningún recurso:` });
      }
      }
    } else {
        res.status(404).json({ message: `No existe ningún recurso:` });
    }
});

//GET provincia + año + número de disposición
app.get(rutaoua + '/:province' + '/:year' + '/:disposal_number', (req, res) => {
    var res;
    const year = Number(req.params.year);
    const province = req.params.province;
    const disposal_number = Number(req.params.disposal_number);
    const provSelec = datos.filter(x => x.province === province);
    const yearSelec = provSelec.filter(x => x.year === year);
    const diapSelect = yearSelec.filter(x =>x.disposal_number === disposal_number);
    if (diapSelect.length !== 0) {
        res.json(diapSelect).status(200);
        console.log("New GET to /provisions-for-the-year-2014/" + province + "/" + year + "/" + disposal_number);
    } else {
        res.status(404).json({ message: `No existe ningún recurso para la provincia: ${province} en el año: ${year} con el número de disposición: ${disposal_number}.` });
    }
});



  //GET periodo concreto + provincia
app.get(rutaoua + '/:province', (req, res) => {
    const province = req.params.province;
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    const yearSelect = datos.filter(x => x.year >= from && x.year <= to);
    const provSelecc = yearSelect.filter(x => x.province == province);
    if (from && to) {
        if (from >= to) {
            res.status(400).send("El rango es incorrecto");
        } else {
            if(provSelecc.length !== 0){
              res.status(200).json(provSelecc);
              console.log(`New GET to /provisions-for-the-year-2014/${province}?from=${from}&to=${to}`);
            }
            else{
              res.status(404).send("No existe ningún recurso")
            }

        }
    } else {
        const provSeleccionda = datos.filter(x => x.province === province);
        if(provSeleccionda.length !== 0){
          res.json(provSeleccionda);
          console.log("New GET to /provisions-for-the-year-2014/" + province);
        }
        else{
          res.status(404).send("No existe ningún recurso")
        }
    }
});

/*------------------------------------------------POST---------------------------------------------------*/

//POST rutaoua
app.post(rutaoua, (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send("Hay que insertar datos.");
    } else {
        newData = req.body;
        if (datos.some(x =>
                x.province === newData.province &&
                x.year === newData.year &&
                x.summary === newData.summary &&
                x.type_of_provision === newData.type_of_provision &&
                x.disposal_number === newData.disposal_number &&
                x.number_of_the_Bulletin === number_of_the_Bulletin &&
                x.date_of_disposition === date_of_disposition &&
                x.section_number === section_number &&
                x.section === section
                )) {
            res.status(409).send("El recurso ya existe.");
        } else {
            datos.push(req.body);
            console.log(`newData = ${JSON.stringify(req.body, null, 2)}`);
            console.log("New POST to /provisions-for-the-year-2014");
            res.status(201).send("El recurso se ha creado correctamente.");
        }
    }
});

//Ruta específica POST NO permitida
app.post(rutaoua + "/loadInitialData", (req, res) => {
    res.status(405).send("POST no está permitido en esta ruta.");
});


/*----------------------------------------PUT-----------------------------------------------------*/

//PUT actualizar disposicion
app.put(rutaoua + '/:province' + '/:year' + '/:disposal_number', (req, res) => {
    const province = req.params.province;
    const year = Number(req.params.year);
    const disposal_number = Number(req.params.disposal_number);

    const existe = datos.find(x => x.province === province && Number(x.year) === year && Number(x.disposal_number) === disposal_number);
    if (!existe || province !== req.body.province || year !== Number(req.body.year) || disposal_number !== Number(req.body.disposal_number)) {
        return res.status(400).send("Disposición incorrecta.");
    } else {
        //{province,year,summary,type_of_provision,disposal_number,
        //number_of_the_Bulletin,date_of_disposition,section_number,section:
        existe.summary = req.body.summary || existe.summary;
        existe.type_of_provision = req.body.type_of_provision || existe.type_of_provision;
        existe.number_of_the_Bulletin = req.body.number_of_the_Bulletin || existe.number_of_the_Bulletin;
        existe.date_of_disposition = req.body.date_of_disposition || existe.date_of_disposition;
        existe.section_number = Number(req.body.section_number) || existe.section_number;
        existe.section = req.body.section || existe.section;
        res.status(200).send("Disposición actualizada correctamente");
        console.log("New PUT to /provisions-for-the-year-2014/" + province + "/" + year + "/" + disposal_number);
    }
});
//PUT rutaoua
app.put(rutaoua, (req, res) => {
    res.status(405).send("PUT no está permitido en esta ruta.");
});

/*-------------------------------------------------DELETE------------------------------------------------ */

//DELETE Todos los datos
app.delete(rutaoua, (req, res) => {
    datos = [];
    res.status(200).send("Los datos se han borrado correctamente.");
});

//DELETE de un recurso.
app.delete(rutaoua + "/:province/:year/:disposal_number", (req, res) => {
  const province = req.params.province;
  const year = Number(req.params.year);
  const disposal_number = Number(req.params.disposal_number);
  
  datos = datos.filter(x=> x.province !== province && x.year!==year && x.disposal_number!==disposal_number);
  res.status(200).send("El recurso se ha borrado correctamente.");
});



//Get Victor
app.get(BASE_API_URL + "/agroprices-weekly/", (req, res) => {
  res.json(useVSE.array_VSE);
  console.log("New GET to /agroprices-weekly")
});

//Get Victor recurso especifico
//GET recurso especifico
app.get(BASE_API_URL+"/agroprices-weekly/mercados/:market",(req,res)=>{
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
    res.json(useVSE.array_VSE)
    console.log("Se han creado 10 datos")

} else {
  res.send('Ya existen datos');
    console.log('Ya existen datos')
}
});

//Metodo Post de recurso(fallido) Victor
//POST FALLIDO
app.post(BASE_API_URL+"/agroprices-weekly/mercados/:market",(req,res)=>{
  res.sendStatus(405, "Method not allowed");
  console.log("New post /agroprices-weekly/mercados/:market");
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
app.delete(BASE_API_URL + "/agroprices-weekly/mercados/:market", (request, response) => {
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
app.put(BASE_API_URL + "/agroprices-weekly/mercados/:market", (request, response) => {
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
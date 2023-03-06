var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/cool", (request,response) =>{
    response.send(cool());
    console.log("New request");
});

app.get("/samples/ARC", (req,res) =>{
  let result=media_ARC("Almería")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});

app.get("/samples/OUA", (req,res) =>{
  let result=media_OUA("Sevilla")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});

app.get("/samples/VSE", (req,res) =>{
  let result=media_VSE("CO-Córdoba")
  res.send(`<h1 style="text-align:center;">${result}</h1>`)
});

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});


const miArray = [{state_id:4,state_s:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"31/01/2000",day	:31,temp_max:13.5,hormin_temp_max	:1736,temp_min	:10.67,hormin_temp_min	:2135,temp_average	:11.26,hum_max	:91.9,hum_min	:73.8,hum_average	:83.5,wind_speed:596,wind_direction:317.3,radiation:2,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"01/02/2000",day	:32,temp_max	:19.16,hormin_temp_max	:1411,temp_min	:7.94,hormin_temp_min	:147,temp_average	:13.28,hum_max	:98.5,hum_min	:47.41,hum_average	:80.5,wind_speed:967,wind_direction:273,radiation:11.76,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"02/02/2000",day	:33,temp_max	:20.1,hormin_temp_max	:1305,temp_min	:9.42,hormin_temp_min	:651,temp_average	:14.29,hum_max	:98.6,hum_min	:50.03,hum_average	:80.8,wind_speed:1.179,wind_direction:61.06,radiation:13.18,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"03/02/2000",day	:34,temp_max	:19.42,hormin_temp_max	:1332,temp_min	:10.49,hormin_temp_min	:530,temp_average	:14.68,hum_max	:91.7,hum_min	:53,hum_average	    :68.89,wind_speed:1.058,wind_direction:337.2,radiation:13.33,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"04/02/2000",day	:35,temp_max	:17.88,hormin_temp_max	:1336,temp_min	:11.04,hormin_temp_min	:430,temp_average	:14.43,hum_max	:92.2,hum_min	:18.54,hum_average	:58.5,wind_speed:2.325,wind_direction:50.62,radiation:14.11,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"05/02/2000",day	:36,temp_max	:19.32,hormin_temp_max	:959,temp_min	:9.56,hormin_temp_min	:2338,temp_average	:14.8,hum_max	:81.6,hum_min	:11.57,hum_average	:37.77,wind_speed:2.89,wind_direction:56.1,radiation:14.4,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"06/02/2000",day	:37,temp_max	:16.61,hormin_temp_max	:1254,temp_min	:7.75,hormin_temp_min	:451,temp_average	:12.22,hum_max	:94.9,hum_min	:43.88,hum_average	:65.21,wind_speed:1.571,wind_direction:302.5,radiation:13.91,precipitation:0},
{state_id	:2,state_s	:"Huelva",station_id	:3,station_s	:"La Mojonera",date	:"07/02/2000",day	:38,temp_max	:20.84,hormin_temp_max	:1351,temp_min	:8.88,hormin_temp_min	:646,temp_average	:13.96,hum_max	:95.9,hum_min	:25.49,hum_average	:72.2,wind_speed:1.294,wind_direction:37.55,radiation:13.85,precipitation:0},
{state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"08/02/2000",day	:39,temp_max	:19.23,hormin_temp_max	:1405,temp_min	:10.16,hormin_temp_min	:435,temp_average	:14.42,hum_max	:91,hum_min	    :43.25,hum_average	:66.2,wind_speed:1.152,wind_direction:287,radiation:12.47,precipitation:0},
{state_id	:3,state_s	:"Sevilla",station_id	:2,station_s	:"La Mojonera",date	:"09/02/2000",day	:40,temp_max	:19.83,hormin_temp_max	:1355,temp_min	:10.29,hormin_temp_min	:609,temp_average	:14.68,hum_max	:94.9,hum_min	:36.78,hum_average	:66.35,wind_speed:1.676,wind_direction:60.25,radiation:13.9,precipitation:0}]; //temperaturas maximas

function media_ARC(provincia) {
  var filtrado = miArray.filter(v => v.state_s==provincia);
  var suma=0;
  for (let i=0;i<filtrado.length;i++){
      var suma = suma + filtrado[i].temp_max;
  }
  return suma/filtrado.length;
}

var datos = new Array();
					                                            					
datos = [{province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},		
         {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"26/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Sevilla",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"19/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Sevilla",summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"10/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"}
        		];


function media_oua(provincia) {
    var filtrado = datos.filter(v => v.province==provincia);
    var suma=0;
    for (let i=0;i<filtrado.length;i++){
        var suma = suma + filtrado[i].number_of_the_Bulletin;
    }
    return suma/filtrado.length;
}

let array = [
  {
      product: "REFINADO",
      type: "Aceites de girasol",
      class: "S.E.",
      unit: "100 kg",
      market: "CO-Córdoba",
      commpos: "A.I.",
      week1: 77.53,
      week2: 76.55
  },
  {
    product: "REFINADO",
    type: "Aceites de girasol",
    class: "S.E.",
    unit: "100 kg",
    market: "SE-Sevilla",
    commpos: "A.I.",
    week1: 80.00,
    week2: 79.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Montes Orientales",
  commpos: "A.I.",
  week1: 180.00,
  week2: 180.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Alhama",
  commpos: "A.I.",
  week1: 140.00,
  week2: 140.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Montes Orientales",
  commpos: "A.I.",
  week1: 179.00,
  week2: 180.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "CA-Cádiz",
  commpos: "A.I.",
  week1: 174.00,
  week2: 174.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "HU-Huelva",
  commpos: "A.I.",
  week1: 210.00,
  week2: 210.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Granada",
  commpos: "A.I.",
  week1: 159.00,
  week2: 168.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "CO-Córdoba",
  commpos: "A.I.",
  week1: 172.80,
  week2: 172.80
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "MA-Málaga",
  commpos: "A.I.",
  week1: 172.20,
  week2: 176.30
}
];

function media_VSE(provincia) {
  var filtrado = array.filter(v => v.market==provincia);
  var suma=0;
  for (let i=0;i<filtrado.length;i++){
      var suma = suma + filtrado[i].week1;
  }
  return suma/filtrado.length;
}


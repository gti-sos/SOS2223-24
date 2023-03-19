var express = require("express");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 12345;

app.use("/", express.static("./public"));

app.use(bodyParser.json());

var useOUA = require("./Samples/OUA");
var useARC = require("./Samples/ARC");


const BASE_API_URL = "/api/v1";

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
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



var backend_vse = require("./backend/index-vse");
backend_vse(app);

var backend_arc = require("./backend/index-arc");
backend_arc(app);

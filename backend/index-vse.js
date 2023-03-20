var Datastore = require('nedb');
var db = new Datastore();

module.exports = (app) => {

    var useVSE = require("../Samples/VSE");
    db.insert(useVSE.array_VSE);
    const BASE_API_URL = "/api/v1";
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
      db.insert(array_10);
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
    //   const exists = useVSE.array_VSE.some(agro => agro.product === req.body.product && agro.market === req.body.market) -> usar el db.find
      if (exists) {
        res.status(409).send('Conflicto: Este objeto ya existe');
      } else {
        db.insert(req.body);
        // Enviar una respuesta con un código de estado 201 Created
        res.status(201).send('Los datos se han creado correctamente');
      }
    }
    });
  
    // Metodo PUT en URL base Victor(no se permite)
  app.put(BASE_API_URL + "/agroprices-weekly", (req, res) => {
    res.status(405).send('En esta ruta no esta permitido el metodo PUT');
  });
  
  // Método DELETE en URL base Victor
  app.delete(BASE_API_URL + "/agroprices-weekly", (req, res) => {
    //usar db.delete
    res.status(200).send('Se han borrado los datos');
  });
  
  //Metodo delete recurso especifico Victor
  //DELETE  DE UN RECURSO
  app.delete(BASE_API_URL + "/agroprices-weekly/mercados/:market", (request, response) => {
    const market = request.params.market;
    if (market) { // Comprobar si se encontró el elemento
      response.status(204).send("Se ha eliminado correctamente"); // Enviar una respuesta vacía con el código 204 (No Content) para indicar éxito sin contenido
    } else {
      response.status(404).send({ error: "No se encontró el elemento con el mercado especificado" }); // Enviar una respuesta con el código 404 (Not Found) si el elemento no se encontró
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
}
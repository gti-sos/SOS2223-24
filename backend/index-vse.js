var Datastore = require('nedb');
var db = new Datastore();

module.exports = (app) => {

    var useVSE = require("../Samples/VSE");
    db.insert(useVSE.array_VSE);
    const BASE_API_URL = "/api/v1";
    const rutavse = "/api/v1/agroprices-weekly";
    //Get Victor
    app.get(BASE_API_URL + "/agroprices-weekly/", (req, res) => {
    res.json(useVSE.array_VSE);
    console.log("New GET to /agroprices-weekly")
  });
  
  
  //loadInitialData
  app.get(rutavse + "/loadInitialData", (req, res) => {
    db.find({}, function (err, docs) {
      if (docs.length === 0) {
        db.insert([
          {product: "REFINADO",type: "Aceites de girasol",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 77.53,week2: 76.55},
          {product: "DE ORUJO CRUDO",type: "ACEITES DE OLIVA",class: "5 g BAS. 10",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 73.62,week2: 79.50},
          {product: "DE ORUJO REFINADO",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 118.69,week2: 121.25},
          {product: "VÍRGENES-VIRGEN EXTRA",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Alhama",commpos: "A.I.",week1: 202.00,week2: 203.00},
          {product: "BLANCA O COMÚN",type: "AVENA",class: "S.E.",unit: "t",market: "SE-Sevilla",commpos: "S.Alm.",week1: 183.00,week2: 184.00},
          {product: "CABALLAR",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Montes Occidentales",commpos: "S.Alm.",week1: 180.00,week2: 180.00},
          {product: "CERVECERA",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Alhama",commpos: "S.Alm.",week1: 180.00,week2: 180.00},
          {product: "FINO O MESERO",type: "LIMÓN",class: "I",unit: "100 kg",market: "MA-Málaga",commpos: "C.M.",week1: 85.00,week2: 85.00},
          {product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "HU-Huelva",commpos: "Árbol",week1: 30.00,week2: 30.00},
          {product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "MA-Málaga",commpos: "Árbol",week1: 16.00,week2: 16.00}
        ], function (err, newDocs) {
          res.send(JSON.stringify(newDocs, null, 2));
          console.log("Se han creado 10 datos");
        });
      } else {
        res.send("Ya existen datos");
        console.log("Ya existen datos");
      }
    });
    console.log("New GET to /agroprices-weekly/loadInitialData");
  });

  //GET producto + tipo + mercado
  app.get(rutavse + '/:product' + '/:type' + '/:market', (req, res) => {
    const product = req.params.product;
    const type = req.params.type;
    const market = req.params.market;
    
    db.find({ product: product, type: type, market: market }, (err, docs) => {
        if (err) {
        res.status(500).json({ message: 'Error interno del servidor' });
        } else if (docs.length > 0) {
        res.json(docs).status(200);
        console.log(`Nuevo GET a ${rutavse}/${product}/${type}/${market}`);
        } else {
        res.status(404).json({ message: `No existe ningún recurso para el producto: ${product} del tipo: ${type} en el mercado de : ${market}.` });
        }
    });
});

    //GET BASE, Paginating, Search, from&to
    app.get(rutavse, (req, res) => {
      //paginating
      let offset = 0;
      let limit = 0;

      if (req.query.offset) {
          offset = Number(req.query.offset);
      }
      if (req.query.limit) {
          limit = Number(req.query.limit);
      }

      //Búsquedas
      let query = {};

      if (req.query.market) {
          query.market = req.query.market;
      }
      if (req.query.product) {
          query.product = req.query.product;
      }
      if (req.query.type) {
          query.type = req.query.type;
      }
      if (req.query.class) {
          query.class = req.query.class;
      }
      if (req.query.unit) {
          query.unit = req.query.unit;
      }
      if (req.query.commpos) {
          query.commpos = req.query.commpos;
      }
      if (req.query.week1) {
          query.week1 = Number(req.query.week1);
      }
      if (req.query.week2) {
          query.week2 = Number(req.query.week2);
      }

      //Búsquedas numéricas

      //precio semanal
      if (req.query.week1_price_over) {
          query.week1 = { $gte: Number(req.query.week1_price_over) };
      }
      if (req.query.week2_price_over) {
          query.week2 = { $lte: Number(req.query.week2_price_over) };
      }
  });

      // POST
      app.post(rutavse, (req, res) => {
        console.log(req.body);
        if (!req.body) {
            res.status(400).send("Hay que insertar datos.");
        } else {
            const newData = req.body;
            db.find({
                product: newData.product,
                type: newData.type,
                class: newData.class,
                unit: newData.unit,
                market: newData.market,
                commpos: newData.commpos,
                week1: newData.week1,
                week2: newData.week2,
            }, (err, docs) => {
                if (docs.length > 0) {
                    res.status(409).send("El recurso ya existe.");
                } else {
                    db.insert(newData, (err, doc) => {
                        if (err) {
                            res.status(500).send("Error interno del servidor.");
                        } else {
                            console.log(`newData = ${JSON.stringify(doc, null, 2)}`);
                            console.log("New POST to /agroprocices-weekly");
                            res.status(201).send("El recurso se ha creado correctamente.");
                        }
                    });
                }
            });
        }
    });

  //Metodo Post de recurso(fallido) Victor
  //POST FALLIDO
  app.post(BASE_API_URL+"/agroprices-weekly/mercados/:market",(req,res)=>{
    res.sendStatus(405, "Method not allowed");
    console.log("New post /agroprices-weekly/mercados/:market");
  });
  

      //PUT actualizar precio de un producto en un mercado en la semana 1
      app.put(rutavse + '/:market' + '/:product' + '/:week1', (req, res) => {
        const market = req.params.market;
        const product = req.params.product;
        const week1 = Number(req.params.week1);

        db.findOne({ market: market, product: product, week1: week1 }, (err, existe) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!existe || market !== req.body.market || product !== req.body.product || week1 !== Number(req.body.week1)) {
                return res.status(400).send("Disposición incorrecta.");
            } else {
                existe.type = req.body.type || existe.type;
                existe.class = req.body.class || existe.class;
                existe.unit = req.body.unit || existe.unit;
                existe.commpos = req.body.commpos || existe.commpos;
                existe.week2 = Number(req.body.week2) || existe.week2;
                db.update({ _id: existe._id }, existe, {}, (err, numReplaced) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).send("Disposición actualizada correctamente");
                    console.log("New PUT to /agroprices-weekly/" + market + "/" + product + "/" + week1);
                });
            }
        });
    });


  // Metodo PUT en URL base Victor(no se permite)
  app.put(BASE_API_URL + "/agroprices-weekly", (req, res) => {
    res.status(405).send('En esta ruta no esta permitido el metodo PUT');
  });
  
  
  //Metodo Post en loadInitialData Bloqueado Victor
  app.get(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
    res.status(405).send('En esta ruta no esta permitido el metodo POST');
  });

  //DELETE Todos los datos
  app.delete(rutavse, (req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error al eliminar los datos.");
        } else {
            res.status(200).send("Los datos se han borrado correctamente.");
        }
    });
});


  //DELETE de un recurso.
  app.delete(rutavse + "/:market/:product/:type", (req, res) => {
      const market = req.params.market;
      const product = req.params.product;
      const type = req.params.type;
      
      db.remove({ market: market, product: product, type: type }, {}, (err, numRemoved) => {
      if (err) {
          res.status(500).send("Error interno del servidor.");
      } else if (numRemoved === 0) {
          res.status(404).send("El recurso no existe.");
      } else {
          res.status(200).send("El recurso se ha borrado correctamente.");
      }
      });
  });
  
}
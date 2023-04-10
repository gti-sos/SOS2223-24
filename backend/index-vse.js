import Datastore from 'nedb';
var db = new Datastore();

function vse (app){
    const BASE_API_URL = "/api/v1";
    const rutavse = "/api/v1/agroprices-weekly";
    const API_DOC_PORTAL = "https://documenter.getpostman.com/view/26059751/2s93K1oezi";

    //POSTMAN docs
    app.get(rutavse+"/docs",(req,res)=>{
      res.redirect(API_DOC_PORTAL);
    });
  
  
  //loadInitialData
  app.get(rutavse + "/loadInitialData", (req, res) => {
    db.find({}, function (err, docs) {
      if (docs.length === 0) {
        db.insert([
          {product: "REFINADO",type: "Aceites de girasol",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",price: 77.53,date: "30-12-2013->5-1-2014"},
          {product: "DE ORUJO CRUDO",type: "ACEITES DE OLIVA",class: "5 g BAS. 10",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",price: 79.50,date: "6-1-2014->12-1-2014"},
          {product: "DE ORUJO REFINADO",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",price: 118.69,date: "30-12-2013->5-1-2014"},
          {product: "VÍRGENES-VIRGEN EXTRA",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Alhama",commpos: "A.I.",price: 203.00,date: "6-1-2014->12-1-2014"},
          {product: "BLANCA O COMÚN",type: "AVENA",class: "S.E.",unit: "t",market: "SE-Sevilla",commpos: "S.Alm.",price: 183.00,date: "30-12-2013->5-1-2014"},
          {product: "CABALLAR",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Montes Occidentales",commpos: "S.Alm.",price: 180.00,date: "30-12-2013->5-1-2014"},
          {product: "CERVECERA",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Alhama",commpos: "S.Alm.",price: 180.00,date: "6-1-2014->12-1-2014"},
          {product: "FINO O MESERO",type: "LIMÓN",class: "I",unit: "100 kg",market: "MA-Málaga",commpos: "C.M.",price: 85.00,date: "30-12-2013->5-1-2014"},
          {product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "HU-Huelva",commpos: "Árbol",price: 30.00,date: "6-1-2014->12-1-2014"},
          {product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "MA-Málaga",commpos: "Árbol",price: 16.00,date: "6-1-2014->12-1-2014"}
        ], function (err, newDocs) {
            res.status(201).json('Se han creado 10 datos');
            console.log("Se han creado 10 datos");
        });
      } else {
        res.status(200).json('Ya existen datos' );
        console.log("Ya existen datos");
      }
    });
    console.log("New GET to /agroprices-weekly/loadInitialData");
  });

  //GET producto + tipo
  app.get(rutavse + '/:product' + '/:type' , (req, res) => {
    const product = req.params.product;
    const type = req.params.type;
    
    db.find({ product: product, type: type}, (err, docs) => {
        if (err) {
        res.status(500).json({ message: 'Error interno del servidor' });
        } else if (docs.length > 0) {
            if(docs.length == 1){
                res.json({...docs[0], _id: undefined})
            }
            else{
                res.status(200).json(docs.map((p) => {
                    delete p._id;
                    return(p);
                }));
            }
        console.log(`Nuevo GET a ${rutavse}/${product}/${type}`);
        } else {
        res.status(404).json({ message: `No existe ningún recurso para el producto: ${product} en el tipo: ${type} ` });
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
      if (req.query.price) {
          query.price = Number(req.query.price);
      }
      if (req.query.date) {
          query.date = req.query.date;
      }

      //Búsquedas numéricas

      //precio semanal
      if (req.query.price_price_over) {
          query.price = { $gte: Number(req.query.price_price_over) };
      }
      if (req.query.price_price_below) {
          query.price = { $lte: Number(req.query.price_price_over) };
      }

    //GET and GET ?from&to and GET ?price
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    const price = Number(req.query.price);

    if (from && to) {
        if (from >= to) {
            res.status(400).json("El rango es incorrecto");
        } else {
            query.price = { $gte: from, $lte: to };
        }
        } else if (price) {
            query.price = price;
        }
        db.find(query).sort({ market: req.body.market }).skip(offset).limit(limit).exec(function (err, docs) {
            if (err) {
                res.status(500).json(err);
            } else if (docs.length === 0) {
                res.status(404).json(`No existe ningún recurso.`);
            } else {
                if(docs.length == 1){
                    res.json({...docs[0], _id: undefined})
                }
                else{
                    res.status(200).json(docs.map((p) => {
                        delete p._id;
                        return(p);
                    }));
                }
            }
        });

  });

      // POST
      app.post(rutavse, (req, res) => {
        console.log(req.body);
        let newReq = req.body;
        if (!req.body || !newReq.hasOwnProperty('product') || !newReq.hasOwnProperty('type') || 
        !newReq.hasOwnProperty('class') || !newReq.hasOwnProperty('unit') || 
        !newReq.hasOwnProperty('market') || !newReq.hasOwnProperty('commpos') ||
        !newReq.hasOwnProperty('price') || !newReq.hasOwnProperty('date')) {
            res.status(400).json({ message: 'Verifique que ha insertado todos los campos' });
        } else {
            const newData = req.body;
            db.find({
                product: newData.product,
                type: newData.type,
                class: newData.class,
                unit: newData.unit,
                market: newData.market,
                commpos: newData.commpos,
                price: newData.price,
                date: newData.date,
            }, (err, docs) => {
                if (docs.length > 0) {
                    res.status(409).json({ message: 'El recurso ya existe.' });
                } else {
                    db.insert(newData, (err, doc) => {
                        if (err) {
                            res.status(500).json(`Error interno del servidor: ${err}`);
                        } else {
                            console.log(`newData = ${JSON.stringify(doc, null, 2)}`);
                            console.log("New POST to /agroprocices-weekly");
                            res.status(201).json("El recurso se ha creado correctamente.");
                        }
                    });
                }
            });
        }
    });

  //Metodo Post de recurso(fallido) Victor
  //POST FALLIDO
  app.post(BASE_API_URL+"/agroprices-weekly/mercados/:market",(req,res)=>{
    res.status(405).json( "POST no está permitido en esta ruta."   );
    console.log("New post /agroprices-weekly/mercados/:market");
  });
  

      //PUT actualizar precio de un producto en un mercado en la semana 1
      app.put(rutavse + '/:market' + '/:product' , (req, res) => {
        const market = req.params.market;
        const product = req.params.product;
        

        db.findOne({ market: market, product: product }, (err, existe) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!existe || market !== req.body.market || product !== req.body.product ) {
                return res.status(400).send("Disposición incorrecta.");
            } else {
                existe.type = req.body.type || existe.type;
                existe.class = req.body.class || existe.class;
                existe.unit = req.body.unit || existe.unit;
                existe.commpos = req.body.commpos || existe.commpos;
                existe.price = Number(req.body.price) || existe.price;
                existe.date = req.body.date || existe.date;
                db.update({ _id: existe._id }, existe, {}, (err, numReplaced) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).send("Disposición actualizada correctamente");
                    console.log("New PUT to /agroprices-weekly/" + market + "/" + product);
                });
            }
        });
    });


  // Metodo PUT en URL base Victor(no se permite)
  app.put(BASE_API_URL + "/agroprices-weekly", (req, res) => {
    res.status(405).json({message: "PUT no está permitido en esta ruta."});
  });
  
  
  //Metodo Post en loadInitialData Bloqueado Victor
  app.get(BASE_API_URL + "/agroprices-weekly/loadInitialData", (req, res) => {
    res.status(405).send('En esta ruta no esta permitido el metodo POST');
  });

  //DELETE Todos los datos
  app.delete(rutavse, (req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.status(500).json({message: "Ha ocurrido un error al eliminar los datos."});
        } else {
            res.status(200).json({message: "Los datos se han borrado correctamente."});
        }
    });
});


  //DELETE de un recurso.
  app.delete(rutavse + "/:product/:date/:market", (req, res) => {
      const product = req.params.product;
      const date = req.params.date;
      const market = req.params.market;
      
      db.remove({ product: product, date: date, market: market }, {}, (err, numRemoved) => {
      if (err) {
        res.status(500).json({message: "Error interno del servidor."});
      } else if (numRemoved === 0) {
        res.status(404).json({message: "El recurso no existe."});
      } else {
        res.status(200).json({message: "El recurso se ha borrado correctamente."});
      }
      });
  });
  
}

export { vse };
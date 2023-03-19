module.exports = (app)=>{

    var useOua = require("../Samples/OUA");
    const Datastore = require('nedb');
    const db = new Datastore({ filename: 'provisions.db', autoload: true });
    const rutaoua = "/api/v1/provisions-for-the-year-2014";


    app.get(rutaoua + "/loadInitialData", (req, res) => {
        db.find({}, function (err, docs) {
          if (docs.length === 0) {
            db.insert([
                {province:"Jaen" ,year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},	
                {province:"Jaen" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
                {province:"Sevilla" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
                {province:"Cordoba" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
                {province:"Granada"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
                {province:"Almeria"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
                {province:"Sevilla" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_disposition:"28/11/2013",section_number:5,section:"Anuncios"},		
                {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_disposition:"11/12/2013",section_number:5,section:"Anuncios"},	
                {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_disposition:"15/11/2013",section_number:5,section:"Anuncios"},	
                {province:"Sevilla" , year: 2013, summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_disposition:"27/12/2013",section_number:5,section:"Anuncios"}
            ], function (err, newDocs) {
              res.send(JSON.stringify(newDocs, null, 2));
              console.log("Se han creado 10 datos");
            });
          } else {
            res.send("Ya existen datos");
            console.log("Ya existen datos");
          }
        });
        console.log("New GET to /provisions-for-the-year-2014/loadInitialData");
      });

    //GET provincia + año + número de disposición
    app.get(rutaoua + '/:province' + '/:year' + '/:disposal_number', (req, res) => {
        const year = Number(req.params.year);
        const province = req.params.province;
        const disposal_number = Number(req.params.disposal_number);
        
        db.find({ province: province, year: year, disposal_number: disposal_number }, (err, docs) => {
            if (err) {
            res.status(500).json({ message: 'Error interno del servidor' });
            } else if (docs.length > 0) {
            res.json(docs).status(200);
            console.log(`Nuevo GET a ${rutaoua}/${province}/${year}/${disposal_number}`);
            } else {
            res.status(404).json({ message: `No existe ningún recurso para la provincia: ${province} en el año: ${year} con el número de disposición: ${disposal_number}.` });
            }
        });
    });

    //GET and GET ?from&to and GET ?year
    app.get(rutaoua, (req, res) => {
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        const year = Number(req.query.year);
        
        if (from && to) {
        if (from >= to) {
            res.status(400).send("El rango es incorrecto");
        } else {
            db.find({ year: { $gte: from, $lte: to } }, (err, yearSelect) => {
            if (err) {
                res.status(500).send(err);
            } else if (yearSelect.length !== 0) {
                res.status(200).json(yearSelect);
                console.log(`New GET to /provisions-for-the-year-2014/?from=${from}&to=${to}`);
            } else {
                res.status(404).send(`No existe ningún recurso en el periodo ${from}-${to}.`)
            }
            });
        }
        } else if (year) {
        db.find({ year: year }, (err, yearSelect) => {
            if (err) {
            res.status(500).send(err);
            } else if (yearSelect.length === 0) {
            res.status(404).send(`No exite ningun dato para el año ${year}`);
            } else {
            res.status(200).json(yearSelect);
            console.log(`New GET to /provisions-for-the-year-2014?year=${year}`);
            }
        });
        } else {
        db.find({}, (err, datos) => {
            if (err) {
            res.status(500).send(err);
            } else if (datos.length !== 0) {
            res.status(200).json(datos);
            console.log("New GET to /provisions-for-the-year-2014/");
            } else {
            res.status(404).json({ message: `No existe ningún recurso:` });
            }
        });
        }
    });  

    //GET periodo concreto + provincia
    app.get(rutaoua + '/:province', (req, res) => {
        const province = req.params.province;
        const from = Number(req.query.from);
        const to = Number(req.query.to);
    
        // Filtrar por rango de años y por provincia en la base de datos
        db.find({ province: province, year: { $gte: from, $lte: to } }, function (err, docs) {
        if (from && to) {
            if (from >= to) {
            res.status(400).send("El rango es incorrecto");
            } else {
            if (docs.length !== 0) {
                res.status(200).json(docs);
                console.log(`New GET to /provisions-for-the-year-2014/${province}?from=${from}&to=${to}`);
            }
            else {
                res.status(404).send("No existe ningún recurso")
            }
            }
        } else {
            // Filtrar solo por provincia en la base de datos
            db.find({ province: province }, function (err, docs) {
            if (docs.length !== 0) {
                res.json(docs);
                console.log("New GET to /provisions-for-the-year-2014/" + province);
            }
            else {
                res.status(404).send("No existe ningún recurso")
            }
            });
        }
        });
    });
  
    /*------------------------------------------------POST---------------------------------------------------*/

    // POST rutaoua
    app.post(rutaoua, (req, res) => {
        console.log(req.body);
        if (!req.body) {
            res.status(400).send("Hay que insertar datos.");
        } else {
            const newData = req.body;
            db.find({
                province: newData.province,
                year: newData.year,
                summary: newData.summary,
                type_of_provision: newData.type_of_provision,
                disposal_number: newData.disposal_number,
                number_of_the_Bulletin: newData.number_of_the_Bulletin,
                date_of_disposition: newData.date_of_disposition,
                section_number: newData.section_number,
                section: newData.section
            }, (err, docs) => {
                if (docs.length > 0) {
                    res.status(409).send("El recurso ya existe.");
                } else {
                    db.insert(newData, (err, doc) => {
                        if (err) {
                            res.status(500).send("Error interno del servidor.");
                        } else {
                            console.log(`newData = ${JSON.stringify(doc, null, 2)}`);
                            console.log("New POST to /provisions-for-the-year-2014");
                            res.status(201).send("El recurso se ha creado correctamente.");
                        }
                    });
                }
            });
        }
    });

    //Ruta específica POST NO permitida
    app.post(rutaoua + "/loadInitialData", (req, res) => {
        db.find({ year: 2014 }, (err, docs) => {
            if (err) {
                res.status(500).send("Error al obtener datos desde la base de datos.");
            } else {
                res.status(405).send("POST no está permitido en esta ruta.");
            }
        });
    });


/*------------------------------------------------PUT----------------------------------------------------------- */
    //PUT actualizar disposicion
    app.put(rutaoua + '/:province' + '/:year' + '/:disposal_number', (req, res) => {
        const province = req.params.province;
        const year = Number(req.params.year);
        const disposal_number = Number(req.params.disposal_number);

        db.findOne({ province: province, year: year, disposal_number: disposal_number }, (err, existe) => {
            if (err) {
                return res.status(500).send(err);
            }
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
                db.update({ _id: existe._id }, existe, {}, (err, numReplaced) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).send("Disposición actualizada correctamente");
                    console.log("New PUT to /provisions-for-the-year-2014/" + province + "/" + year + "/" + disposal_number);
                });
            }
        });
    });



    //PUT rutaoua No permitido
    app.put(rutaoua, (req, res) => {
        res.status(405).send("PUT no está permitido en esta ruta.");
    });


/*-------------------------------------------------DELETE------------------------------------------------ */

    //DELETE Todos los datos
    app.delete(rutaoua, (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.status(500).send("Ha ocurrido un error al eliminar los datos.");
            } else {
                res.status(200).send("Los datos se han borrado correctamente.");
            }
        });
    });


    //DELETE de un recurso.
    app.delete(rutaoua + "/:province/:year/:disposal_number", (req, res) => {
        const province = req.params.province;
        const year = Number(req.params.year);
        const disposal_number = Number(req.params.disposal_number);
        
        db.remove({ province: province, year: year, disposal_number: disposal_number }, {}, (err, numRemoved) => {
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

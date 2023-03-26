module.exports = (app)=>{

    const Datastore = require('nedb');
    const db = new Datastore();
    const provisionsDB = "../db/provisions";
    const rutaoua = "/api/v1/provisions-for-the-year-2014";
    const API_DOC_PORTAL = "https://documenter.getpostman.com/view/26056359/2s93JzN1dS";

    //POSTMAN docs
    app.get(rutaoua+"/docs",(req,res)=>{
        res.redirect(API_DOC_PORTAL);
      });



    app.get(rutaoua + "/loadInitialData", (req, res) => {
        db.find({}, function (err, docs) {
          if (docs.length === 0) {
            db.insert([
                    {
                      province: "Huelva",
                      year: 2014,
                      organization: "Consejería de La Presidencia",
                      disposal_type: "Resoluciones",
                      disposal_number: 7,
                      number_of_the_bulletin: 133,
                      date_of_disposition: "01-07-2014",
                      section_number: 3,
                      section: "Otras disposiciones",
                    },
                    {
                      province: "Málaga",
                      year: 2014,
                      organization: "Consejería de Igualdad, Salud y Políticas Sociales",
                      disposal_type: "Acuerdos",
                      disposal_number: 161,
                      number_of_the_bulletin: 140,
                      date_of_disposition: "01-07-2014",
                      section_number: 5,
                      section: "Anuncios",
                    },
                    {
                      province: "Almería",
                      year: 2014,
                      organization: "Juzgados de Primera Instancia",
                      disposal_type: "Edictos",
                      disposal_number: 10,
                      number_of_the_bulletin: 251,
                      date_of_disposition: "01-09-2014",
                      section_number: 4,
                      section: "Administración de Justicia",
                    },
                    {
                      province: "Granada",
                      year: 2014,
                      organization: "Consejería de Agricultura, Pesca y Desarrollo Rural",
                      disposal_type: "Resoluciones",
                      disposal_number: 113,
                      number_of_the_bulletin: 204,
                      date_of_disposition: "01-09-2014",
                      section_number: 5,
                      section: "Anuncios",
                    },
                    {
                      province: "Granada",
                      year: 2014,
                      organization: "Consejería de Agricultura, Pesca y Desarrollo Rural",
                      disposal_type: "Acuerdos",
                      disposal_number: 118,
                      number_of_the_bulletin: 204,
                      date_of_disposition: "01-09-2014",
                      section_number: 5,
                      section: "Anuncios",
                    },
                    {
                      province: "Almería",
                      year: 2014,
                      organization: "Universidades",
                      disposal_type: "Resoluciones",
                      disposal_number: 3,
                      number_of_the_bulletin: 203,
                      date_of_disposition: "01-10-2014",
                      section_number: 2,
                      section: "Autoridades y personal",
                    },
                    {
                      province: "Cádiz",
                      year: 2014,
                      organization: "Consejería de Fomento y Vivienda",
                      disposal_type: "Anuncios",
                      disposal_number: 85,
                      number_of_the_bulletin: 218,
                      date_of_disposition: "01-10-2014",
                      section_number: 5,
                      section: "Anuncios",
                    },
                    {
                      province: "Sevilla",
                      year: 2014,
                      organization: "Consejería de Igualdad, Salud y Políticas Sociales",
                      disposal_type: "Anuncios",
                      disposal_number: 92,
                      number_of_the_bulletin: 199,
                      date_of_disposition: "01-10-2014",
                      section_number: 5,
                      section: "Anuncios",
                    },
                    {
                        province: "Huelva",
                        year: 2014,
                        organization: "Universidades",
                        disposal_type: "Resoluciones",
                        disposal_number: 9,
                        number_of_the_bulletin: 241,
                        date_of_disposition: "01-12-2014",
                        section_number: 2,
                        section: "Autoridades y personal"
                      },
                      {
                        province: "Málaga",
                        year: 2014,
                        organization: "Consejería de Educación, Cultura y Deporte",
                        disposal_type: "Órdenes",
                        disposal_number: 17,
                        number_of_the_bulletin: 252,
                        date_of_disposition: "01-12-2014",
                        section_number: 3,
                        section: "Otras disposiciones"
                      }
            ], function (err, newDocs) {
              res.status(201).json('Se han creado 10 datos');
              console.log("Se han creado 10 datos");
            });
          } else {
            res.status(200).json('Ya existen datos' );
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
    
        db.findOne({ province: province, year: year, disposal_number: disposal_number }, (err, docs) => {
            if (err) {
                res.status(500).json( 'Error interno del servidor' );
            } else if (docs) {
                delete(docs._id);
                res.status(200).json(docs);
                
                console.log(`Nuevo GET a ${rutaoua}/${province}/${year}/${disposal_number}`);
            } else {
                res.status(404).json(`No existe ningún recurso para la provincia: ${province} en el año: ${year} con el número de disposición: ${disposal_number}.` );
            }
        });
    });
    

    //GET BASE, Paginating, Search, from&to
    app.get(rutaoua, (req, res) => {
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

        if (req.query.province) {
            query.province = req.query.province;
        }
        if (req.query.year) {
            query.year = Number(req.query.year);
        }
        if (req.query.organization) {
            query.organization = req.query.organization;
        }
        if (req.query.disposal_type) {
            query.disposal_type = req.query.disposal_type;
        }
        if (req.query.disposal_number) {
            query.disposal_number = Number(req.query.disposal_number);
        }
        if (req.query.number_of_the_Bulletin) {
            query.number_of_the_Bulletin = Number(req.query.number_of_the_Bulletin);
        }
        if (req.query.date_of_disposition) {
            query.date_of_disposition = req.query.date_of_disposition;
        }
        if (req.query.section_number) {
            query.section_number = Number(req.query.section_number);
        }
        if (req.query.section) {
            query.section = req.query.section;
        }

        //Búsquedas numéricas

        //disposal_number
        if (req.query.disposal_number_over) {
            query.disposal_number = { $gte: Number(req.query.disposal_number_over) };
        }
        if (req.query.disposal_number_below) {
            query.disposal_number = { $lte: Number(req.query.disposal_number_below) };
        }

        //year
        if (req.query.year_over) {
            query.year = { $gte: Number(req.query.year_over) };
        }
        if (req.query.year_below) {
            query.year = { $lte: Number(req.query.year_below) };
        }

        //number_of_the_Bulletin
        if (req.query.number_of_the_Bulletin_over) {
            query.number_of_the_Bulletin = { $gte: Number(req.query.number_of_the_Bulletin_over) };
        }
        if (req.query.number_of_the_Bulletin_below) {
            query.number_of_the_Bulletin = { $lte: Number(req.query.number_of_the_Bulletin_below) };
        }

        //GET and GET ?from&to and GET ?year
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        const year = Number(req.query.year);

        if (from && to) {
            if (from >= to) {
                res.status(400).json("El rango es incorrecto");
            } else {
                query.year = { $gte: from, $lte: to };
            }
        } else if (year) {
            query.year = year;
        }

        db.find(query).sort({ disposal_number: req.body.disposal_number }).skip(offset).limit(limit).exec(function (err, docs) {
            if (err) {
                res.status(500).json(err);
            } else if (docs.length === 0) {
                res.status(404).json(`No existe ningún recurso.`);
            } else {
                res.status(200).json(docs.map((p) => {
                    delete p._id;
                    return(p);
                }));
            }
        });
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
                res.status(200).json(docs.map((p) => {
                    delete p._id;
                    return(p);
                }));
                console.log(`New GET to /provisions-for-the-year-2014/${province}?from=${from}&to=${to}`);
            }
            else {
                res.status(404).json("No existe ningún recurso")
            }
            }
        } else {
            // Filtrar solo por provincia en la base de datos
            db.find({ province: province }, function (err, docs) {
            if (docs.length !== 0) {
                res.json(docs.map((p) => {
                    delete p._id;
                    return(p);
                }));
                console.log("New GET to /provisions-for-the-year-2014/" + province);
            }
            else {
                res.status(404).json('No existe ningún recurso' );
            }
            });
        }
        });
    });
  
    /*------------------------------------------------POST---------------------------------------------------*/

    // POST rutaoua
    app.post(rutaoua, (req, res) => {
        console.log(req.body);
        let newReq = req.body;
        if (!req.body || !newReq.hasOwnProperty('province') || !newReq.hasOwnProperty('year') || 
        !newReq.hasOwnProperty('organization') || !newReq.hasOwnProperty('disposal_type') || 
        !newReq.hasOwnProperty('disposal_number') || !newReq.hasOwnProperty('number_of_the_Bulletin') ||
        !newReq.hasOwnProperty('date_of_disposition') || !newReq.hasOwnProperty('section_number') ||
        !newReq.hasOwnProperty('section')) {
            res.status(400).json({ message: 'Verifique que ha insertado todos los campos' });
        } else {
            const newData = req.body;
            db.find({
                province: newData.province,
                year: newData.year,
                organization: newData.organization,
                disposal_type: newData.disposal_type,
                disposal_number: newData.disposal_number,
                number_of_the_Bulletin: newData.number_of_the_Bulletin,
                date_of_disposition: newData.date_of_disposition,
                section_number: newData.section_number,
                section: newData.section
            }, (err, docs) => {
                if (docs.length > 0) {
                    res.status(409).json({ message: 'El recurso ya existe.' });
                } else {
                    db.insert(newData, (err, doc) => {
                        if (err) {

                            res.status(500).json(`Error interno del servidor: ${err}`);
                        } else {
                            console.log(`newData = ${JSON.stringify(doc, null, 2)}`);
                            console.log("New POST to /provisions-for-the-year-2014");
                            res.status(201).json("El recurso se ha creado correctamente.");

                        }
                    });
                }
            });
        }
    });

    //Ruta específica POST NO permitida
    app.post(rutaoua + "/loadInitialData", (req, res) => {
        db.find({}, (err, docs) => {
            if (err) {
                res.status(500).json(`Error al obtener datos desde la base de datos: ${err}`);
            } else {
                res.status(405).json( "POST no está permitido en esta ruta."   );
            }
        });
    });

        //Ruta /provincia POST NO permitida
        app.post(rutaoua + "/:province", (req, res) => {
            db.find({}, (err, docs) => {
                if (err) {
                    res.status(500).json(`Error al obtener datos desde la base de datos: ${err}`);
                } else {
                    res.status(405).json( "POST no está permitido en esta ruta."   );
                }
            });
        });

        //POST no permitido en recurso único
        app.post(rutaoua + '/:province' + '/:year' + '/:disposal_number', (req, res) => {
            db.find({}, (err, docs) => {
                if (err) {
                    res.status(500).json(`Error al obtener datos desde la base de datos: ${err}`);
                } else {
                    res.status(405).json( "POST no está permitido en esta ruta."   );
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
                return res.status(500).json(err);
            }
            if (!existe || province !== req.body.province || year !== Number(req.body.year) || disposal_number !== Number(req.body.disposal_number)) {
                return res.status(400).json({message:"Disposición incorrecta."});
            } else {
                existe.organization = req.body.organization || existe.organization;
                existe.disposal_type = req.body.disposal_type || existe.disposal_type;
                existe.number_of_the_Bulletin = req.body.number_of_the_Bulletin || existe.number_of_the_Bulletin;
                existe.date_of_disposition = req.body.date_of_disposition || existe.date_of_disposition;
                existe.section_number = Number(req.body.section_number) || existe.section_number;
                existe.section = req.body.section || existe.section;
                db.update({ _id: existe._id }, existe, {}, (err, numReplaced) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.status(200).json({message: "Disposición actualizada correctamente"});
                    console.log("New PUT to /provisions-for-the-year-2014/" + province + "/" + year + "/" + disposal_number);
                });
            }
        });
    });


    //PUT pronvincia No permitido
    app.put(rutaoua+'/:province', (req, res) => {
        res.status(405).json({message: "PUT no está permitido en esta ruta."});
    });

    //PUT pronvincia/año No permitido
    app.put(rutaoua+'/:province/:year', (req, res) => {
        res.status(405).json({message: "PUT no está permitido en esta ruta."});
    });

    //PUT rutaoua No permitido
    app.put(rutaoua, (req, res) => {
        res.status(405).json({message: "PUT no está permitido en esta ruta."});
    });


/*-------------------------------------------------DELETE------------------------------------------------ */

    //DELETE Todos los datos
    app.delete(rutaoua, (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.status(500).json({message: "Ha ocurrido un error al eliminar los datos."});
            } else {
                res.status(200).json({message: "Los datos se han borrado correctamente."});
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
            res.status(500).json({message: "Error interno del servidor."});
        } else if (numRemoved === 0) {
            res.status(404).json({message: "El recurso no existe."});
        } else {
            res.status(200).json({message: "El recurso se ha borrado correctamente."});
        }
        });
    });
}
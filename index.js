import express from "express";
import { handler } from "./frontend/build/handler.js";
import cors from 'cors';
import request from "request";

var port = process.env.PORT || 12345;
var app = express();
app.use(cors());
app.use(express.json());



const BASE_API_URL = "/api/v1";

import{oua2} from "./backend/index-oua-v2.js";
import { oua } from "./backend/index-oua.js";
oua(app);
oua2(app);
import { vse } from "./backend/index-vse.js";
vse(app);
import { arc } from "./backend/index-arc.js";
arc(app);


app.use(handler);

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});


//Proxy Ouael
var paths = "/bicycle-plans";
var apiServerHost = "https://sos2223-17.appspot.com/api/v2/andalusian-bicycle-plans";


app.use(paths, async (request, response) => {
  try {
    // Llamada a la API externa
    const responseApi = await axios.get(apiServerHost+request.url);
    console.log(responseApi);
    response.json(responseApi.data);
    console.log()

  } catch (error) {
      response.status(500).json({ error: "Error en el proxy" });
  }
});

import express from "express";
//import { handler } from "./frontend/build/handler.js";
var port = process.env.PORT || 12345;

var app = express();
//app.use("/", express.static("./public"));
app.use(express.json());



const BASE_API_URL = "/api/v1";

import { oua } from "./backend/index-oua.js";
oua(app);
import { vse } from "./backend/index-vse.js";
vse(app);
import { arc } from "./backend/index-arc.js";
arc(app);


//app.use(handler);

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});

//var backend_oua = require("./backend/index-oua");
//backend_oua(app);

//var backend_vse = require("./backend/index-vse");
//backend_vse(app);

//var backend_arc = require("./backend/index-arc");
//backend_arc(app);



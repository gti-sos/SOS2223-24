var express = require("express");
var cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 12345;

app.use("/", express.static("./public"));

app.use(bodyParser.json());

var useARC = require("./Samples/ARC");


const BASE_API_URL = "/api/v1";

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});

var backend_oua = require("./backend/index-oua");
backend_oua(app);

var backend_vse = require("./backend/index-vse");
backend_vse(app);

var backend_arc = require("./backend/index-arc");
backend_arc(app);

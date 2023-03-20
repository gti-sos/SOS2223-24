var express = require("express");
const bodyParser = require("body-parser");
var port = process.env.PORT || 12345;

var app = express();
app.use("/", express.static("./public"));
app.use(bodyParser.json());



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

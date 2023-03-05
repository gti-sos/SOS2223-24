var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/faces", (req,res) =>{
    res.send(cool());
    console.log("New request");
});

app.listen(port, ()=>{
  console.log(`server ready in port ${port}`);
});
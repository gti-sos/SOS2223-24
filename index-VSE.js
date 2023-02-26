// var express = require("express");
// var cool = require("cool-ascii-faces");

// var app = express();

// app.get("/faces", (req,res) =>{
//     res.send(cool());
//     console.log("New request");
// });

// app.listen(12345);

// console.log("Server ready in port 12345");

function media(array) {
    var total = 0;
    array.forEach(function(elemento) {
      total += elemento;
    });
    return total / array.length;
  }

  var semana1 = [77.53,80.00,140.00,174.00,210.00,159.00,172.80,172.20];
  var mediaSem1 = media(semana1);
  console.log(mediaSem1);
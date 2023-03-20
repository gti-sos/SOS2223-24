const array = [
{product: "REFINADO",type: "Aceites de girasol",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 77.53,week2: 76.55},
{product: "DE ORUJO CRUDO",type: "ACEITES DE OLIVA",class: "5 g BAS. 10",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 73.62,week2: 79.50},
{product: "DE ORUJO REFINADO",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "CO-Córdoba",commpos: "A.I.",week1: 118.69,week2: 121.25},
{product: "VÍRGENES-VIRGEN EXTRA",type: "ACEITES DE OLIVA",class: "S.E.",unit: "100 kg",market: "GR-Alhama",commpos: "A.I.",week1: 202.00,week2: 203.00},
{product: "BLANCA O COMÚN",type: "AVENA",class: "S.E.",unit: "t",market: "SE-Sevilla",commpos: "S.Alm.",week1: 183.00,week2: 184.00},
{product: "CABALLAR",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Montes Occidentales",commpos: "S.Alm.",week1: 180.00,week2: 180.00},
{product: "CERVECERA",type: "CEBADA",class: "S.E.",unit: "t",market: "GR-Alhama",commpos: "S.Alm.",week1: 180.00,week2: 180.00},
{product: "FINO O MESERO",type: "LIMÓN",class: "I",unit: "100 kg",market: "MA-Málaga",commpos: "C.M.",week1: 85.00,week2: 85.00},
{product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "HU-Huelva",commpos: "Árbol",week1: 30.00,week2: 30.00},
{product: "CLEMENTINA MEDIA TEMPORADA-CLEMENULES",type: "MANDARINA",class: "S.E.",unit: "100 kg",market: "MA-Málaga",commpos: "Árbol",week1: 16.00,week2: 16.00}];

function media(provincia) {
  var filtrado = array.filter(v => v.market==provincia);
  var suma=0;
  for (let i=0;i<filtrado.length;i++){
      var suma = suma + filtrado[i].week1;
  }
  return suma/filtrado.length;
}
  console.log(media("CO-Córdoba"));


  module.exports.array_VSE = array;
  module.exports.media_VSE =  media;
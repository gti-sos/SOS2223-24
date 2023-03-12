let array = [
  {
      product: "REFINADO",
      type: "Aceites de girasol",
      class: "S.E.",
      unit: "100 kg",
      market: "CO-Córdoba",
      commpos: "A.I.",
      week1: 77.53,
      week2: 76.55
  },
  {
    product: "REFINADO",
    type: "Aceites de girasol",
    class: "S.E.",
    unit: "100 kg",
    market: "SE-Sevilla",
    commpos: "A.I.",
    week1: 80.00,
    week2: 79.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Montes Orientales",
  commpos: "A.I.",
  week1: 180.00,
  week2: 180.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Alhama",
  commpos: "A.I.",
  week1: 140.00,
  week2: 140.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Montes Orientales",
  commpos: "A.I.",
  week1: 179.00,
  week2: 180.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "CA-Cádiz",
  commpos: "A.I.",
  week1: 174.00,
  week2: 174.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "HU-Huelva",
  commpos: "A.I.",
  week1: 210.00,
  week2: 210.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "GR-Granada",
  commpos: "A.I.",
  week1: 159.00,
  week2: 168.00
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "CO-Córdoba",
  commpos: "A.I.",
  week1: 172.80,
  week2: 172.80
},
{
  product: "VÍRGENES-LAMPANTE (2 g)",
  type: "ACEITES DE OLIVA",
  class: "S.E.",
  unit: "100 kg",
  market: "MA-Málaga",
  commpos: "A.I.",
  week1: 172.20,
  week2: 176.30
}
];

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
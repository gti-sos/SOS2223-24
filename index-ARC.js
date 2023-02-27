

function calcularMedia(array) {
    let suma = 0;
    array.forEach(function(elemento) {
      suma += elemento;
    });
    return suma / array.length;
  }

  const miArray = [13.5,19.16,20.1,19.42,17.88,19.32,16.61,20.84,19.23,19.83]; //temperaturas maximas
  const media = calcularMedia(miArray);
  console.log(media);
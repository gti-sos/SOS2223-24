

function calcularMedia(array) {
    let suma = 0;
    array.forEach(function(elemento) {
      suma += elemento;
    });
    return suma / array.length;
  }

  const miArray = [{state_id:4,state_s:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"31/01/2000",day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:"01/02/2000",day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:2,state_s	:"Huelva",station_id	:3,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:4,state_s	:"Almería",station_id	:1,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},
    {state_id	:3,state_s	:"Sevilla",station_id	:2,station_s	:"La Mojonera",date	:,day	:,temp_max	:,hormin_temp_max	:,temp_min	:,hormin_:,temp_min	:,temp_average	:,hum_max	:,hum_min	:,hum_average	:,wind_speed:,wind_direction:,radiation:,precipitation:},]; //temperaturas maximas
  const media = calcularMedia(miArray);
  console.log(media);
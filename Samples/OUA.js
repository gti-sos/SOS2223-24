					                                            					
const datos = [{province:"Jaen" ,year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},	
         {province:"Jaen" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
         {province:"Sevilla" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
         {province:"Cordoba" , year: 2014, summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios"},
         {province:"Granada"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
         {province:"Almeria"  , year: 2014, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios"},	
         {province:"Sevilla" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_disposition:"28/11/2013",section_number:5,section:"Anuncios"},		
         {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_disposition:"11/12/2013",section_number:5,section:"Anuncios"},	
         {province:"Almeria" , year: 2013, summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_disposition:"15/11/2013",section_number:5,section:"Anuncios"},	
         {province:"Sevilla" , year: 2013, summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_disposition:"27/12/2013",section_number:5,section:"Anuncios"}
        ];


function media(provincia) {
    var filtrado = datos.filter(v => v.province===provincia);
    var suma=0;
    for (let i=0;i<filtrado.length;i++){
        var suma = suma + filtrado[i].number_of_the_Bulletin;
    }
    return suma/filtrado.length;
}
console.log(media("Sevilla"));


module.exports.datos_oua = datos;
module.exports.media_OUA =  media;

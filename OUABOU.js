
var datos = new Array();
					                                            					
datos = [{province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:81,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:80,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:78,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Almeria",summary:"Empresas Públicas y Asimiladas",type_of_provision:"Anuncios",disposal_number:77,number_of_the_Bulletin:254,date_of_the_bulletin :"30/12/2014",date_of_disposition:"18/12/2014",section_number:5,section:"Anuncios",date_of_publication:"30/12/2014 0:07",subsection:"5.2 Otros anuncios oficiales"},
         {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:88,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Málaga" ,summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:87,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:86,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"16/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},		
         {province:"Granada",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:85,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"26/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Sevilla",summary:"Consejería de Agricultura, Pesca y Desarrollo Rural",type_of_provision:"Anuncios",disposal_number:84,	number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"19/06/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"},	
         {province:"Sevilla",summary:"Consejería de Fomento y Vivienda",type_of_provision:"Anuncios",disposal_number:83,number_of_the_Bulletin:141,	date_of_the_bulletin:"22/07/2014",	date_of_disposition:"10/07/2014",section_number:5,section:"Anuncios",date_of_publication:"21/07/2014 23:07"	,subsection:"5.2 Otros anuncios oficiales"}
        		];


function media(provincia) {
    var filtrado = datos.filter(v => v.province==provincia);
    var suma=0;
    for (let i=0;i<filtrado.length;i++){
        var suma = suma + filtrado[i].number_of_the_Bulletin;
    }
    return suma/filtrado.length;
}
console.log(media("Sevilla"));



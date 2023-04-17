<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { Pagination, PaginationItem, PaginationLink, Styles } from 'sveltestrap';
    import {dev} from '$app/environment';
    import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Alert } from 'sveltestrap';
    

    let API = '/api/v2/provisions-for-the-year-2014';

    if(dev) API = 'http://localhost:12345' + API;


    onMount(async () => {
        getProvisions();
    });
    function volverAtras (){
        return history.back()
    }


    let open = false;
    const toggle = () => (open = !open);





    let result = "";
    let resultStatus = "";
    let message = "";

    function showMessage(message) {
      const messages = document.getElementById("messages");
      const messageElement = document.createElement("div");
      messageElement.innerHTML = message;
      messages.appendChild(messageElement);
      console.log(`Mensaje: ${message}`);
      setTimeout(() => {
        messageElement.remove();
      }, 2000);
    }


  // --------------------------------------Pagination --------------------------------------------
  
 
  // --------------------------------------Pagination --------------------------------------------

let currentPage = 1;
const itemsPerPage = 10;

function getTotalPages(totalItems) {
  return Math.ceil(totalItems / itemsPerPage);
}

function updateUrl() {
  const url = new URL(window.location);
  url.searchParams.set("page", currentPage);
  window.history.pushState({}, '', url);
}

function goToPage(page) {
  currentPage = page;
  const offset = (currentPage - 1) * itemsPerPage;
  const url = API + `?offset=${offset}&limit=${itemsPerPage}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      provisions = data;
    })
    .catch(error => {
      console.error('Error fetching provisions:', error);
    })
    .finally(() => {
      updateUrl();
    });
}


// fetch the initial data and calculate the total pages
fetch(API)
  .then(response => response.json())
  .then(data => {
    provisions = data;
    const totalPages = getTotalPages(provisions.length);
    // render the pagination links
    // you can use a loop to generate the links
    // each link should call the goToPage function with its page number
  })
  .catch(error => {
    console.error('Error fetching provisions:', error);
  });

// render the items for the current page
function renderItems() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = provisions.slice(startIndex, endIndex);
  // render the items using a loop or a component
}

// call the renderItems function whenever the currentPage or provisions array changes



  let offset = 0;
  let limit = 10;
  const pageSize = 10;
  const apiUrl = API+ `?offset=${(currentPage - 1) * pageSize}&limit=${pageSize}`;
      
    let search = false; // se ha buscado



    let provisions = [{province: '',
                        year: '',
                        organization: '',
                        disposal_type: '',
                        disposal_number: '',
                        number_of_the_bulletin: '',
                        date_of_disposition: '',
                        section_number:'',
                        section:''
                    }];
    
    async function loadProvisions() {
      const res = await fetch(API, {
        method: "GET"
      });

      try {
        const res = loadProvisions()
        const data = await res.json();
        provisions = data;
        result = JSON.stringify(data, null, 2);
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
      
    }




          // Define el objeto de búsqueda
          let query = {
            province: "",
            year: "",
            organization: "",
            disposal_type: "",
            disposal_number: "",
            disposal_number_over: "",
            disposal_number_below: "",
            number_of_the_bulletin: "",
            number_of_the_bulletin_over: "",
            number_of_the_bulletin_below: "",
            date_of_disposition: "",
            section_number: "",
            section: "",
            from:"",
            to:"",
            offset:"",
            limit:""
        };





  // Función para obtener las provisions según el objeto de búsqueda y los parámetros de paginación
  async function getProvisions(){
    // Construye la URL para hacer la petición GET al backend
    let url = API
    if(query.offset && query.limit) url +=  `/?offset=${query.offset}&limit=${query.limit}`;
    else    url += `/?offset=${offset}&limit=${limit}`;


    // Agrega los parámetros de búsqueda a la URL, si existen

    if (query.from) {
      url += `&from=${query.from}`;
    }
    if (query.to) {
      url += `&to=${query.to}`;
    }

    if (query.province) {
      url += `&province=${query.province}`;
    }
    if (query.year) {
      url += `&year=${query.year}`;
    }
    if (query.organization) {
      url += `&organization=${query.organization}`;
    }
    if (query.disposal_type) {
      url += `&disposal_type=${query.disposal_type}`;
    }
    if (query.disposal_number) {
      url += `&disposal_number=${query.disposal_number}`;
    }
    if (query.disposal_number_over) {
      url += `&disposal_number_over=${query.disposal_number_over}`;
    }
    if (query.disposal_number_below) {
      url += `&disposal_number_below=${query.disposal_number_below}`;
    }
    if (query.number_of_the_bulletin) {
      url += `&number_of_the_bulletin=${query.number_of_the_bulletin}`;
    }
    if (query.number_of_the_bulletin_over) {
      url += `&number_of_the_bulletin_over=${query.number_of_the_bulletin_over}`;
    }
    if (query.number_of_the_bulletin_below) {
      url += `&number_of_the_bulletin_below=${query.number_of_the_bulletin_below}`;
    }
    if (query.date_of_disposition) {
      url += `&date_of_disposition=${query.date_of_disposition}`;
    }
    if (query.section_number) {
      url += `&section_number=${query.section_number}`;
    }
    if (query.section) {
      url += `&section=${query.section}`;
    }


    // Realiza la petición GET al backend
    const res = await fetch(url, {
      method: "GET"
    });

    try {
      const data = await res.json();
      provisions = data;
      result = JSON.stringify(data, null, 2);
      renderItems();
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
    
  }




  // Función para cambiar la página actual y obtener las provisions correspondientes
  const cambiarPagina = (event) => {
    offset = event.detail.offset;
    obtenerprovisions();
  };

  // Función para buscar las provisions correspondientes al objeto de búsqueda actual
  const buscarprovisions = () => {
    offset = 0; // Reinicia el offset a cero para mostrar las primeras provisions de la nueva búsqueda
    obtenerprovisions();
  };



  let newProvision = {province:"",
                      year:"",
                      organization:"",
                      disposal_type:"",
                      disposal_number:"",
                      number_of_the_bulletin:"",
                      date_of_disposition:"",
                      section_number:"",
                      section:""
                    };
  /*let newProvince, newYear, newOrganization, newDisposal_type, newDisposal_number, newNumber_of_the_bulletin, newDate_of_disposition, newSection_number, newSection;
  newProvince= newYear= newOrganization= newDisposal_type= newDisposal_number= newNumber_of_the_bulletin= newDate_of_disposition= newSection_number= newSection = "";
*/

    async function createProvitions(){
      resultStatus = result = "";
      let province = newProvision.province;
      let year = Number(newProvision.year);
      let disposal_number = Number(newProvision.disposal_number);
      let number_of_the_bulletin = Number(newProvision.number_of_the_bulletin);
      let section_number = Number(newProvision.section_number);
      let organization = newProvision.organization;
      let disposal_type = newProvision.disposal_type;
      let date_of_disposition = newProvision.date_of_disposition;
      let section = newProvision.section;

      

      let consola = JSON.stringify(
                              {province,
                                year,
                                organization,
                                disposal_type,
                                disposal_number,
                                number_of_the_bulletin,
                                date_of_disposition,
                                section_number,
                                section
                              }
                              );
      console.log(consola);
      const res = await fetch(API, {
            method: 'POST',
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({province,
                                year,
                                organization,
                                disposal_type,
                                disposal_number,
                                number_of_the_bulletin,
                                date_of_disposition,
                                section_number,
                                section
                              }
                              )
                              
        });
        const status = await res.status;
        resultStatus = status;
        if (res.ok ) {
          showMessage("Recurso creado correctamente");
          getProvisions();
        }else{
            if (status == 400) {
              showMessage(`Hay que insertar datos o hay campos vacios (${status})`);              
            }else{
                if(status == 409){
                    showMessage(`El recurso ya existe o la provincia no existe(${status})`);
                }
            }
        }
    }
    

  


    

    async function deleteProvisions() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
              open = false;
            getProvisions();
            message = "Recursos borrados correctamente";
          
            
            
        }
    }

    async function deleteProvision(province, year, disposal_number) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + province + "/" + year + "/" + disposal_number, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getProvisions();
            message = "Recurso borrado correctamente";            
        }
    }



</script>

<h1>Provisiones</h1>
<h2>Desarrollado por Ouael Boussiali</h2>
<p>Provisions devueltos: {provisions.length}</p>

<div id="messages" class="messages"></div>


    <div class="cabecera">
        <Col md>

              <tr class="btn-head" >
                <td class = "borrar"><Button color="danger" on:click={toggle}>Borrar recursos</Button></td>
                <td class = "volveratras"><Button color="info" on:click={volverAtras}>Volver Atras</Button>
                </td>

              </tr>
                        
                
                <Modal isOpen={open} {toggle}>
                    <ModalHeader {toggle}>Procede a borrar todos los datos</ModalHeader>
                    <ModalBody>¿Estás seguro?</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" on:click={deleteProvisions}>Confirmar</Button>
                        <Button color="secondary" on:click={toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                      </Col>
    </div>




    <div class="tablas">


      <h3>Buscar y Filtrar por propiedades</h3>

        <Table bordered>

        <thead>
              
              
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
          <tr>
            <td><input type="number" placeholder="Desde el año: " bind:value={query.from} style="color: #888;" /></td>
            <td><input type="number" placeholder="Hasta el año: " bind:value={query.to} style="color: #888;" /></td>
          </tr>
            
            <tr>
            <th>Número de Disposición Mayor</th>
            <th>Número de Disposición Menor</th>
            <th>Número de Boletín Mayor</th>
            <th>Número de Boletín Menor</th>
            </tr>
            
            <tr>
            <td><input type="number" placeholder="Número de Disposición Mayor: " bind:value={query.disposal_number_over} style="color: #888;" /></td>
            <td><input type="number" placeholder="Número de Disposición Menor: " bind:value={query.disposal_number_below} style="color: #888;" /></td>
            <td><input type="number" placeholder="Número de Boletín Mayor" bind:value={query.number_of_the_bulletin_over} style="color: #888;" /></td>
            <td><input type="number" placeholder="Número de Boletín Menor" bind:value={query.number_of_the_bulletin_below} style="color: #888;" /></td>
            </tr>
          <tr>
            <th>Provincia</th>
            <th>Año</th>
            <th>Organización</th>
            <th>Tipo de disposición</th>
            <th>Número de Disposición</th>
            <th>Número del Boletín</th>
            <th>Fecha de disposición</th>
            <th>Número de sección</th>
            <th>Sección</th>


            </tr>

            <tr> 
              <td><input type="text" placeholder="Provincia" bind:value={query.province} style="color: #888;" /></td>
              <td><input type="text" placeholder="Año" bind:value={query.year} style="color: #888;" /></td>
              <td><input type="text" placeholder="Organización" bind:value={query.organization} style="color: #888;" /></td>
              <td><input type="text" placeholder="Tipo de disposición" bind:value={query.disposal_type} style="color: #888;" /></td>
              <td><input type="text" placeholder="Número de Disposición" bind:value={query.disposal_number} style="color: #888;" /></td>
              <td><input type="text" placeholder="Número del Boletín" bind:value={query.disposal_number} style="color: #888;" /></td>
              <td><input type="text" placeholder="Fecha de disposición" bind:value={query.date_of_disposition} style="color: #888;" /></td>
              <td><input type="text" placeholder="Número de sección" bind:value={query.section_number} style="color: #888;" /></td>
              <td><input type="text" placeholder="Sección" bind:value={query.section} style="color: #888;" /></td>
            </tr>
        </thead>
        <tbody>
            
            <th class=btnBuscar>
                <Button  color="success" on:click="{() =>getProvisions()}">Buscar</Button>
            </th> 

            <tr>
              <th>Provincia</th>
              <th>Año</th>
              <th>Organización</th>
              <th>Tipo de disposición</th>
              <th>Número de Disposición</th>
              <th>Número del Boletín</th>
              <th>Fecha de disposición</th>
              <th>Número de sección</th>
              <th>Sección</th>
  
  
              </tr>
            

            {#each  provisions as provision}
                <tr> 
                <td>{provision.province}</td>
                <td>{provision.year}</td>
                <td>{provision.organization}</td>
                <td>{provision.disposal_type}</td>
                <td>{provision.disposal_number}</td>
                <td>{provision.number_of_the_bulletin}</td>
                <td>{provision.date_of_disposition}</td>
                <td>{provision.section_number}</td> 
                <td>{provision.section}</td>
                <td><Button
                    color="danger"
                    on:click={() => deleteProvision(provision.province, provision.year, provision.disposal_number)}
                    >Borrar</Button>
                  </td>
                  <td><Button color = "info" on:click><a href="provisions-for-the-year-2014/{provision.province}/{provision.year}/{provision.disposal_number}">Editar</a></Button></td>

                </tr>
            {/each}
    
        </tbody>
    </Table>

    <Pagination size="lg" ariaLabel="Page navigation example">
      <PaginationItem>
        <PaginationLink first on:click={() => goToPage(1)} href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous on:click={() => goToPage(currentPage-1)} href="#" />
      </PaginationItem>
      {#each Array.from({ length: Math.ceil(provisions.length/itemsPerPage) }, (_, i) => i+1) as page}
        <PaginationItem>
          <PaginationLink on:click={() => goToPage(page)} href="#">{page}</PaginationLink>
        </PaginationItem>
      {/each}
      <PaginationItem>
        <PaginationLink next on:click={() => goToPage(currentPage+1)} href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last on:click={() => goToPage(Math.ceil(provisions.length/itemsPerPage))} href="#" />
      </PaginationItem>
    </Pagination>
    </div>

<div>
    <h3>Crear una provision</h3>
    <Table bordered>

      <thead>
            <tr>
            <th>Provincia</th>
            <th>Año</th>
            <th>Organización</th>
            <th>Tipo de disposición</th>
            <th>Número de Disposición</th>
            <th>Número del Boletín</th>
            <th>Fecha de disposición</th>
            <th>Número de sección</th>
            <th>Sección</th>

            </tr>
      </thead>
      <tbody>
            <tr> 
              <td><input placeholder="Provincia" bind:value={newProvision.province} style="color: #888;" /></td>
              <td><input placeholder="Año" bind:value={newProvision.year} style="color: #888;" /></td>
              <td><input placeholder="Organización" bind:value={newProvision.organization} style="color: #888;" /></td>
              <td><input placeholder="Tipo de disposición" bind:value={newProvision.disposal_type} style="color: #888;" /></td>
              <td><input placeholder="Número de Disposición" bind:value={newProvision.disposal_number} style="color: #888;" /></td>
              <td><input placeholder="Número del Boletín" bind:value={newProvision.number_of_the_bulletin} style="color: #888;" /></td>
              <td><input placeholder="Fecha de disposición" bind:value={newProvision.date_of_disposition} style="color: #888;" /></td>
              <td><input placeholder="Número de sección" bind:value={newProvision.section_number} style="color: #888;" /></td>
              <td><input placeholder="Sección" bind:value={newProvision.section} style="color: #888;" /></td>
            </tr>
        </tbody>

            <td><Button
              color="secondary"
              on:click={() => createProvitions()}
              >Crear Provisión</Button></td>
    </Table>
  </div>






    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
            {resultStatus}
            {result}
        </pre>
    {/if}


<style>

h1{
  text-align: center;
  color: blueviolet;
}

h2{
  text-align: center;
}

.cabecera {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -1000px;
        width: 100%; 
    }

  .btnBuscar {
    text-align: center ;
    display: inline-block;
    margin: 0 10px;
    position: relative;
    right: -1000px;
}

.btn-head{
  position: relative;
  left: 1270px;

}

h3{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;}


</style>



<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import {Pagination,PaginationItem,PaginationLink,Styles,} from "sveltestrap";
  import { dev } from "$app/environment";
  import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
    Alert,
  } from "sveltestrap";

  let API = "/api/v2/provisions-for-the-year-2014";

  if (dev) API = "http://localhost:12345" + API;

  onMount(async () => {
    getProvisions();
  });
  function volverAtras() {
    return history.back();
  }

  let open = false;
  const toggle = () => (open = !open);

  let result = "";
  let resultStatus = "";
  let message = "";
  let search = [];

  function showMessage(message ,color) {
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

  function getTotalPages() {
return Math.ceil(provisions.length / itemsPerPage);
}


function goToPage(page) {
currentPage = page;
let url = API; 
console.log()
if(currentPage > getTotalPages) {
  showMessage('Es la última página');
  goToPage(getTotalPages());
}
else if(search.length !== 0 && currentPage<=getTotalPages() ){
  const offset = (currentPage - 1) * itemsPerPage;
  url += `?offset=${offset}&limit=${itemsPerPage}`;

fetch(url)
  .then(response => response)
  .then(data => {
    search = data;
  })
  .catch(error => {
    console.error('Error fetching Provisions-fo-the-year-2014:', error);
  })

}
}



let currentPage = 1;
const itemsPerPage = 10;

const pageSize = 10;
  

  let datos = "";
  let provisions = [];

  async function loadProvisions() {
    resultStatus = 0;
    result = "";
    const res = await fetch(API + "/loadInitialData", {
      method: "GET",
    });

    const status = await res.status;
    resultStatus = status;
    if (status === 201 || status === 200) {
      datos = true;
      getProvisions();
    }


    try {
      provisions = await res.json();
      search = provisions;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
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
    from: "",
    to: ""
  };

  // Función para obtener las provisions según el objeto de búsqueda y los parámetros de paginación
  // Función para obtener las provisions según el objeto de búsqueda y los parámetros de paginación
async function getProvisions() {
  // Construye la URL para hacer la petición GET al backend
  let url = API;
  let params = '';

  // Agrega los parámetros de búsqueda a la URL, si existen
  if (query.from) {
    params += `&from=${query.from}`;
  }
  if (query.to) {
    params += `&to=${query.to}`;
  }
  if (query.province) {
    params += `&province=${query.province}`;
  }
  if (query.year) {
    params += `&year=${query.year}`;
  }
  if (query.organization) {
    params += `&organization=${query.organization}`;
  }
  if (query.disposal_type) {
    params += `&disposal_type=${query.disposal_type}`;
  }
  if (query.disposal_number) {
    params += `&disposal_number=${query.disposal_number}`;
  }
  if (query.disposal_number_over) {
    params += `&disposal_number_over=${query.disposal_number_over}`;
  }
  if (query.disposal_number_below) {
    params += `&disposal_number_below=${query.disposal_number_below}`;
  }
  if (query.number_of_the_bulletin) {
    params += `&number_of_the_bulletin=${query.number_of_the_bulletin}`;
  }
  if (query.number_of_the_bulletin_over) {
    params += `&number_of_the_bulletin_over=${query.number_of_the_bulletin_over}`;
  }
  if (query.number_of_the_bulletin_below) {
    params += `&number_of_the_bulletin_below=${query.number_of_the_bulletin_below}`;
  }
  if (query.date_of_disposition) {
    params += `&date_of_disposition=${query.date_of_disposition}`;
  }
  if (query.section_number) {
    params += `&section_number=${query.section_number}`;
  }
  if (query.section) {
    params += `&section=${query.section}`;
  }
  if(datos){
     // Agrega los parámetros de búsqueda a la URL solo si ya existe algún parámetro en ella
    if (params) {
      url += `?${params.substring(1)}`;
    }

    // Realiza la petición GET al backend
    const res = await fetch(url, {
      method: 'GET',
    });

    try {
      const data = await res.json();
      provisions = data;
      search = provisions;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }

    const status = await res.status;
    resultStatus = status;
    if (status != 404) {
      datos = true;
    }

  }
 
}


  let newProvision = {
    province: "",
    year: "",
    organization: "",
    disposal_type: "",
    disposal_number: "",
    number_of_the_bulletin: "",
    date_of_disposition: "",
    section_number: "",
    section: "",
  };
  /*let newProvince, newYear, newOrganization, newDisposal_type, newDisposal_number, newNumber_of_the_bulletin, newDate_of_disposition, newSection_number, newSection;
  newProvince= newYear= newOrganization= newDisposal_type= newDisposal_number= newNumber_of_the_bulletin= newDate_of_disposition= newSection_number= newSection = "";
*/

  async function createProvitions() {
    resultStatus = result = "";
    let province1 = newProvision.province;
    let year1 = Number(newProvision.year);
    let disposal_number1 = Number(newProvision.disposal_number);
    let number_of_the_bulletin1 = Number(newProvision.number_of_the_bulletin);
    let section_number1 = Number(newProvision.section_number);
    let organization1 = newProvision.organization;
    let disposal_type1 = newProvision.disposal_type;
    let date_of_disposition1 = newProvision.date_of_disposition;
    let section1 = newProvision.section;

    console.log(newProvision);

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        province: province1,
        year: year1,
        organization: organization1,
        disposal_type: disposal_type1,
        disposal_number: disposal_number1,
        number_of_the_bulletin: number_of_the_bulletin1,
        date_of_disposition: date_of_disposition1,
        section_number: section_number1,
        section: section1
      }),
    });
    const status = await res.status;
    resultStatus = status;
    if (res.ok) {
      showMessage("Recurso creado correctamente");
      provisions.push(JSON.stringify({
        province: province1,
        year: year1,
        organization: organization1,
        disposal_type: disposal_type1,
        disposal_number: disposal_number1,
        number_of_the_bulletin: number_of_the_bulletin1,
        date_of_disposition: date_of_disposition1,
        section_number: section_number1,
        section: section1
      }));
      getProvisions();
      newProvision = [];

    } else {
      if (status == 400) {
        showMessage(`Hay que insertar datos o hay campos vacios (${status})`);
      } else {
        if (status == 409) {
          showMessage(
            `El recurso ya existe o la provincia no existe(${status})`
          );
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
      datos = "";
      getProvisions();
      message = "Recursos borrados correctamente";
    }
  }

  async function deleteProvision(province, year, disposal_number) {
    resultStatus = result = "";
    const res = await fetch(
      API + "/" + province + "/" + year + "/" + disposal_number,
      {
        method: "DELETE",
      }
    );
    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      getProvisions();
      message = "Recurso borrado correctamente";
    }
  }
</script>
<body>
  
<h1>Provisiones</h1>
<h2>Desarrollado por Ouael Boussiali</h2>
<p>Provisions devueltos: {provisions.length}</p>

<div id="messages" class="messages" />

<div class="cabecera">
  <Col md>
    <tr class="btn-head">
      <td>
        <Button outline color ="secondary" on:click={loadProvisions}>Cargar Provisiones</Button
        ></td
      >
      <td class="borrar"
        ><Button color="danger" on:click={toggle}>Borrar recursos</Button></td
      >
      <td class="volveratras"
        ><Button color="info" on:click={volverAtras}>Volver Atras</Button>
      </td>
    </tr>

    <Modal  isOpen={open} {toggle}>
      <ModalHeader >Procede a borrar todos los datos</ModalHeader>
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

  <Table class="tabla" bordered>
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
      </tr>
      <tr>
        <td
          ><input
            type="number"
            placeholder="Desde el año: "
            bind:value={query.from}

          /></td
        >
        <td
          ><input
            type="number"
            placeholder="Hasta el año: "
            bind:value={query.to}

          /></td
        >
      </tr>

      <tr>
        <th>Número de Disposición Mayor</th>
        <th>Número de Disposición Menor</th>
        <th>Número de Boletín Mayor</th>
        <th>Número de Boletín Menor</th>
      </tr>

      <tr>
        <td
          ><input
            type="number"
            placeholder="Número de Disposición Mayor: "
            bind:value={query.disposal_number_over}

          /></td
        >
        <td
          ><input
            type="number"
            placeholder="Número de Disposición Menor: "
            bind:value={query.disposal_number_below}

          /></td
        >
        <td
          ><input
            type="number"
            placeholder="Número de Boletín Mayor"
            bind:value={query.number_of_the_bulletin_over}

          /></td
        >
        <td
          ><input
            type="number"
            placeholder="Número de Boletín Menor"
            bind:value={query.number_of_the_bulletin_below}

          /></td
        >
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
        <td
          ><input
            type="text"
            placeholder="Provincia"
            bind:value={query.province}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Año"
            bind:value={query.year}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Organización"
            bind:value={query.organization}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Tipo de disposición"
            bind:value={query.disposal_type}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Número de Disposición"
            bind:value={query.disposal_number}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Número del Boletín"
            bind:value={query.number_of_the_bulletin}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Fecha de disposición"
            bind:value={query.date_of_disposition}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Número de sección"
            bind:value={query.section_number}

          /></td
        >
        <td
          ><input
            type="text"
            placeholder="Sección"
            bind:value={query.section}

          /></td
        >
      </tr>
    </thead>
    <tbody>
      
      <Button class="btn-buscar" color="success" on:click={() => getProvisions()}>Buscar</Button>

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

      {#if datos}
      {#each provisions.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as provision}
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
          <td
            ><Button
              color="danger"
              on:click={() =>
                deleteProvision(
                  provision.province,
                  provision.year,
                  provision.disposal_number
                )}>Borrar</Button
            >
          </td>
          <td
            ><Button color="info" on:click
              ><a
                href="provisions-for-the-year-2014/{provision.province}/{provision.year}/{provision.disposal_number}"
                >Editar</a
              ></Button
            >
          </td>
        </tr>
        
        
      {/each}
      {/if}

      
      
    </tbody>
  </Table>
  {#if provisions.length > 0}
  <Pagination size="lg" ariaLabel="Page navigation example">
    <PaginationItem disabled={currentPage === 1}>
      <PaginationLink first on:click={() => goToPage(1)} href="#" />
    </PaginationItem>
    <PaginationItem disabled={currentPage === 1}>
      <PaginationLink previous on:click={() => goToPage(currentPage-1)} href="#" />
    </PaginationItem>
    <PaginationItem active>
      <PaginationLink on:click={() => goToPage(currentPage)} href="#">{currentPage}</PaginationLink>
    </PaginationItem>
    <PaginationItem disabled={currentPage === Math.ceil(provisions.length/itemsPerPage)}>
      <PaginationLink next on:click={() => goToPage(currentPage+1)} href="#" />
    </PaginationItem>
    <PaginationItem disabled={currentPage === Math.ceil(provisions.length/itemsPerPage)}>
      <PaginationLink last on:click={() => goToPage(Math.ceil(provisions.length/itemsPerPage))} href="#" />
    </PaginationItem>
  </Pagination>

{/if}





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
        <td
          ><input
            placeholder="Provincia"
            bind:value={newProvision.province}

          /></td
        >
        <td
          ><input
            placeholder="Año"
            bind:value={newProvision.year}

          /></td
        >
        <td
          ><input
            placeholder="Organización"
            bind:value={newProvision.organization}

          /></td
        >
        <td
          ><input
            placeholder="Tipo de disposición"
            bind:value={newProvision.disposal_type}

          /></td
        >
        <td
          ><input
            placeholder="Número de Disposición"
            bind:value={newProvision.disposal_number}

          /></td
        >
        <td
          ><input
            placeholder="Número del Boletín"
            bind:value={newProvision.number_of_the_bulletin}

          /></td
        >
        <td
          ><input
            placeholder="Fecha de disposición"
            bind:value={newProvision.date_of_disposition}

          /></td
        >
        <td
          ><input
            placeholder="Número de sección"
            bind:value={newProvision.section_number}

          /></td
        >
        <td
          ><input
            placeholder="Sección"
            bind:value={newProvision.section}

          /></td
        >
      </tr>
    </tbody>

    <td
      ><Button color="secondary" on:click={() => createProvitions()}
        >Crear Provisión</Button
      ></td
    >
  </Table>
</div>


</body>

<style>
  /* estilos generales */
  body {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #333;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3 {
    margin: 0;
  }

  /* estilos para la cabecera */
  .cabecera {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .btn-head {
    display: flex;
    justify-content: flex-start;
  }

  .borrar {
    margin-left: 10px;
  }

  /* estilos para la tabla */
  .tablas {
    padding: 20px;
    background-color: #f5f5f5;
  }

  


  th,td {
    padding: 0.75rem;
    vertical-align: middle;
    text-align: center;
    border-top: 1px solid #dee2e6;
  }

  th {
    font-weight: bold;
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }

  



  h1 {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  .cabecera {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .borrar {
    text-align: center;
    width: 33%;
  }
  .volveratras {
    text-align: right;
    width: 33%;
  }
  .messages {
    margin-bottom: 30px;
  }
  .tablas {
    margin-bottom: 50px;
  }
  th {
    text-align: center;
  }
  td {
    vertical-align: middle !important;
  }

  .btn-head {
    display: flex;
    justify-content: space-between;
  }

  .btn-buscar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 12px 24px;
}
  

</style>

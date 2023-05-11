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
    FormGroup,
    Form,
    Input,
    Label
  } from "sveltestrap";
    import { error } from "@sveltejs/kit";

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
  const toggleC = () => (showcreateform = !showcreateform);
  const toggleS = () => (showsearchform = !showsearchform);

  let result = "";
  let resultStatus = "";
  let search = [];
  let showM, color,message ="";
  let showcreateform = false;
  let showsearchform = false;
  let loaded = false;

  function showMessage(mensaje, colorM) {
    showM = true;
    color = colorM;
    message = mensaje;
   
    setTimeout(() => {
      showM = false;
    }, 3000);
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
  showMessage('Es la última página', "warning");
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
    loaded = true;

    const status = await res.status;
    resultStatus = status;
    if (status === 201) {
      datos = true;
      getProvisions();
      showMessage("Datos cargados correctamente", "success");
    }else if(status === 200) {
      datos = true;
      getProvisions();
    }
    else{
      datos = false;
      showMessage("Error al cargar los datos", "error")
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
  showsearchform = false;
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


    if(!loaded) loadProvisions();
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
      datos = false;
      console.log(`Error parsing result: ${error}`);
      showMessage('Error al cargar los datos','error');
    }

    const status = await res.status;
    resultStatus = status;
    if (resultStatus === 200) {
      datos = true;
      showMessage("Datos encontrados", "success");
    }
    else{
      datos = false;
      showMessage("No se han encontrado los datos", "danger");

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
      showMessage("Recurso creado correctamente", "success");
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
      showcreateform = false;
      getProvisions();
      newProvision = [];

    } else {
      if (status == 400) {
        showMessage(`Hay que insertar datos o hay campos vacios (${status})`, "danger");
      } else {
        if (status == 409) {
          showMessage(`El recurso ya existe o la provincia no existe(${status})`, "danger");
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
    open = false;
    if (status == 200) {
      open = false;
      datos = "";
      getProvisions();
      showMessage("Recursos borrados correctamente", "success");
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
      showMessage("Recurso borrado correctamente", "success");
    }
  }
</script>
<body>
  
<h1>Provisiones</h1>
<h2>Desarrollado por Ouael Boussiali</h2>
<p>Provisions devueltos: {provisions.length}</p>


<Alert color={color} isOpen={showM}>
  {#if message!=""}
    {message}
  {/if}
  </Alert>

<div class="d-flex justify-content-center">
    <Row>
      <Col sm = "4">
        <Button outline color ="secondary" style="width: 200px;" on:click={loadProvisions}>Cargar Provisiones</Button
        ></Col>
      <Col sm = "4">
        <Button color="success" style="width: 200px;" on:click={toggleC}>Crear una Provisión</Button>
      </Col>
      <Col sm = "4"
        ><Button color="danger" style="width: 200px;" on:click={toggle}>Borrar recursos</Button></Col
      >

    </Row>

    <Modal  isOpen={open} {toggle}>
      <ModalHeader >Procede a borrar todos los datos</ModalHeader>
      <ModalBody>¿Estás seguro?</ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={deleteProvisions}>Confirmar</Button>
        <Button color="secondary" on:click={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
</div>

<div class="tablas">


  <Row>
    <Col class="d-flex justify-content-center">
      <Button style="width: 200px; margin-top: 10px;" color="success" on:click={() => toggleS()}>Filtrar Datos</Button>
    </Col>
  </Row>


  <Table class="tabla" responsive>
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
  {#if datos}
  <Pagination class="d-flex justify-content-center" size="lg" ariaLabel="Page navigation example">
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
<Row>
  <Col sm = "4"
><Button color="info" style="width: 200px; margin-bottom: 30px;" on:click={volverAtras}>Volver Atras</Button>
</Col>
</Row>

<Modal  isOpen={showsearchform} {toggleS}>
  <ModalHeader class="d-flex justify-content-center">Filtrar Datos</ModalHeader>
  <ModalBody>
    <Form>
      <h4>Filtro por Periodo de Años</h4>
      <FormGroup floating label="Desde el Año">
        <Input bind:value={query.from}/>
      </FormGroup>
      <FormGroup floating label="Hasta el Año">
        <Input bind:value={query.to}/>
      </FormGroup>
      <h4>Búsquedas Númericas</h4>
      <FormGroup floating label="Número de Disposición Mayor">
        <Input bind:value={query.disposal_number_over}/>
      </FormGroup>
      <FormGroup floating label="Número de Disposición Menor">
        <Input bind:value={query.disposal_number_below}/>
      </FormGroup>
      <FormGroup floating label="Número de Boletín Mayor">
        <Input bind:value={query.number_of_the_bulletin_over}/>
      </FormGroup>
      <FormGroup floating label="Número del Boletín Menor">
        <Input bind:value={query.number_of_the_bulletin_below}/>
      </FormGroup>
      <h4>Filtro por Propiedades</h4>
      <FormGroup floating label="Provincia">
        <Input bind:value={query.province}/>
      </FormGroup>
      <FormGroup floating label="Año">
        <Input bind:value={query.year}/>
      </FormGroup>
      <FormGroup floating label="Organización">
        <Input bind:value={query.organization}/>
      </FormGroup>
      <FormGroup floating label="Tipo de Disposicón">
        <Input bind:value={query.disposal_type}/>
      </FormGroup>
      <FormGroup floating label="Número de Disposición">
        <Input bind:value={query.disposal_number}      />
      </FormGroup>
      <FormGroup floating label="Número del Boletín">
        <Input bind:value={query.number_of_the_bulletin}/>
      </FormGroup>
      <FormGroup floating label="Fecha de Disposición">
        <Input
        bind:value={query.date_of_disposition}/>
      </FormGroup>
      <FormGroup floating label="Número de Sección">
        <Input bind:value={query.section_number}/>
      </FormGroup>
      <FormGroup floating label="Sección">
        <Input bind:value={query.section}/>
      </FormGroup>
      
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="success" on:click={getProvisions}>Buscar</Button>
    <Button color="secondary" on:click={toggleS}>Cancelar</Button>
  </ModalFooter>
</Modal>

<Modal  isOpen={showcreateform} {toggleC}>
  <ModalHeader >Crear una provisión</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup floating label="Provincia">
        <Input bind:value={newProvision.province}/>
      </FormGroup>
      <FormGroup floating label="Año">
        <Input bind:value={newProvision.year}/>
      </FormGroup>
      <FormGroup floating label="Organización">
        <Input bind:value={newProvision.organization}/>
      </FormGroup>
      <FormGroup floating label="Tipo de Disposicón">
        <Input bind:value={newProvision.disposal_type}/>
      </FormGroup>
      <FormGroup floating label="Número de Disposición">
        <Input bind:value={newProvision.disposal_number}      />
      </FormGroup>
      <FormGroup floating label="Número del Boletín">
        <Input bind:value={newProvision.number_of_the_bulletin}/>
      </FormGroup>
      <FormGroup floating label="Fecha de Disposición">
        <Input
        bind:value={newProvision.date_of_disposition}/>
      </FormGroup>
      <FormGroup floating label="Número de Sección">
        <Input bind:value={newProvision.section_number}/>
      </FormGroup>
      <FormGroup floating label="Sección">
        <Input bind:value={newProvision.section}/>
      </FormGroup>
      
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="success" on:click={createProvitions}>Confirmar</Button>
    <Button color="secondary" on:click={toggleC}>Cancelar</Button>
  </ModalFooter>
</Modal>




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


  .tablas {
    margin-bottom: 50px;
  }
  th {
    text-align: center;
  }
  td {
    vertical-align: middle !important;
  }


</style>

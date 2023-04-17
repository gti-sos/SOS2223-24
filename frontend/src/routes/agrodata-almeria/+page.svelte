<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table, ButtonToolbar,Pagination, PaginationItem, PaginationLink,Input,Container, Row, Col } from 'sveltestrap';
        import { Modal,ModalBody,ModalFooter,ModalHeader, Alert, FormGroup, Label } from 'sveltestrap';
        onMount(async () => {
            getAgrodata();
        });

        const toggle = () => (open = !open);
        const myToggle = () => (myOpen = !myOpen);
        
        let API = '/api/v1/agrodata-almeria';
        
        if(dev)
            API = 'http://localhost:12345'+ API;
            
        let agrodata = [];
        let newState_s = '';
        let newStation_s = '';
        let newYear = '';
        let newDay = '';
        let newTemp_max = '';
        let newTemp_min = '';
        let newTemp_average = '';
        let message = "";
    
        let result = "";
        let resultStatus = "";

        let valor = -1;
        let warning = "";
        let info = "";
        let v_info = false;
        let v_warning = false;
        let errores = "";
        let v_errores = false;
        let success = "";
        let v_success = false;
        let open = false;
        let myOpen = false;
        let consultAPI = "";
        let v_consult = true;
        let pagination = 0;

        let consultYear = null;
        let consultState_s = null;
        let consultStation_s= null;
        let consultDay = null;
        let consultTemp_max = null;
        let consultTemp_min = null;
        let consultTemp_average = null;
        let fromYear = null;
        let toYear = null;


        async function loadData() {
        resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getAgrodata(); 
            }	
        }

        async function getAgrodata() {
            resultStatus = result = "";
            const res = await fetch(API+"?"+"limit=10&"+"offset="+pagination*10, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                agrodata = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
        async function createAgrodata() {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    state_s: newState_s,
                    station_s: newStation_s,
                    year: newYear,
                    day: newDay,
                    temp_max: newTemp_max,
                    temp_min: newTemp_min,
                    temp_average: newTemp_average
                })
            });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            message = "Recurso creado correctamente";
            color_alert = "success";
            getAgrodata();
        }else{
            if (status == 400) {
                message = "Hay que insertar datos o hay campos vacios";
                color_alert = "danger";
            }else{
                if(status == 409){
                    message = "El recurso ya existe o la provincia no pertenece a Andalucia";
                    color_alert = "danger";
                }
            }
        }
    }
        async function deleteAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        getAgrodata();	
        }

        async function deleteAgrodata(year, day, station_s) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + year + "/" + day + "/" + station_s, {
            method: "DELETE",
        });
        const status = await res.status;
            resultStatus = status;
            if(status==200){
                getAgrodata(); 
            }	
        }

        function formConsult() {
  consultAPI = '';
  if (consultYear != null) {
    consultAPI = consultAPI + `year=${consultYear}&`;
  }
  if (consultState_s != null) {
    consultAPI = consultAPI + `state_s=${consultState_s}&`;
  }
  if (consultStation_s != null) {
    consultAPI = consultAPI + `station_s=${consultStation_s}&`;
  }
  if (consultDay != null) {
    consultAPI = consultAPI + `day=${consultDay}&`;
  }
  if (consultTemp_max != null) {
    consultAPI = consultAPI + `temp_max=${consultTemp_max}&`;
  }
  if (consultTemp_min != null) {
    consultAPI = consultAPI + `temp_min=${consultTemp_min}&`;
  }
  if (consultTemp_average != null) {
    consultAPI = consultAPI + `temp_average=${consultTemp_average}&`;
  }
  if (fromYear != null) {
    consultAPI = consultAPI + `from=${fromYear}&`;
  }
  if (toYear != null) {
    consultAPI = consultAPI + `to=${fromYear}&`;
  }
  console.log(consultAPI);
}

async function getConsult() {
  try {
    resultStatus = result = "";
    formConsult();
    const res = await fetch(API + "?" + consultAPI + "limit=10&offset=" + pagination, {
      method: "GET"
    });
    const status = res.status;
    resultStatus = status;
    if (status == 404) {
      throw new Error("No hay datos cargados en la base de datos");
    }
    const data = await res.json();
    result = JSON.stringify(data, null, 2);
    agrodata = data;
    v_consult = false;
  } catch (error) {
    console.log(`Error en la consulta: ${error}`);
    v_warning = true;
    warning = error.message;
  }
}

function cleanFilter() {
  consultAPI = "";
  consultYear = null;
  consultState_s = null;
  consultStation_s = null;
  consultDay = null;
  consultTemp_max = null;
  consultTemp_min = null;
  consultTemp_average = null;
  fromYear = null;
  toYear = null;
  getConsult();
}

        async function countData(){
            const res = await fetch(API, {
                method: 'GET'
            });
            const data = await res.json()
            let numElements = Array.isArray(data) ? data.length : 0;
            let ultPage = Math.floor(numElements/10);
            valor = ultPage
            ;
        }
        function firstPage() {
            pagination=0;
            getAgrodata();
        }
        function nextPage() {
            if (pagination!=valor) {
                pagination++;
                getAgrodata();
            }
        }
  
        function previousPage() {
            if (pagination >= 1) {
                pagination--;
                getAgrodata();
            }
        }
        function lastPage() {
            pagination=valor;
            getAgrodata();
        }
        function infoPage(inf,v_inf){
            info = inf;
            v_info = v_inf;
        }

</script>
<main>
    <h1> Listado de datos: agrodata-almeria</h1>
    
    <div class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button outline on:click={deleteAll}>Borrar Datos</Button>
            <Button color=primary class=botones_iniciales outline on:click={myToggle}>Filtros</Button>
            <Modal isOpen={myOpen} {myToggle}>
                
              </Modal>

              <Modal class="modal-dialog modal-xl" isOpen={myOpen} {myToggle}>
                <ModalHeader {myToggle}>"Consulta"</ModalHeader>
                <ModalBody >
                    <Container class = 'mb-3'>
                        <Row><Col><h5>Introduzca los valores por los que quiere consultar datos</h5></Col></Row>
                        <hr>
                        <Row><Col><h6>Estos campos devolverán un único dato</h6></Col></Row>
                        <br>
                        {consultAPI}  
                        <!-- -->
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Por año:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null  ? true:false}
                                        type="number"                                     
                                        placeholder="Busqueda por un año"
                                        bind:value={consultYear}                                      
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por provincia:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                       
                                        placeholder="Busqueda por una provincia"
                                        bind:value={consultState_s} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Estacion:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                        
                                        placeholder="Busqueda por género"
                                        bind:value={consultStation_s}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Dias:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                        
                                        placeholder="Busqueda por género"
                                        bind:value={consultDay}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Temperatura Máxima:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                        
                                        placeholder="Busqueda por género"
                                        bind:value={consultTemp_max}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Temperatura Mínima:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                        
                                        placeholder="Busqueda por género"
                                        bind:value={consultTemp_min}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Temperatura Media:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null ? true:false}
                                        type="text"                                        
                                        placeholder="Busqueda por género"
                                        bind:value={consultTemp_average}                                        
                                    />
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <hr>
                        <Row><Col><h6>Estos campos devolverán todos los datos que se correspondan con la consulta solicitada</h6></Col></Row>
                        <br>
                        <Row>
                            <Col class = 'mb-3'>
                                <FormGroup>
                                    <Label>Desde el año:</Label>
                                    <Input 
                                        disabled={consultYear != null  ? true:false}
                                        type="number"
                                        placeholder="Escribe un año"
                                        bind:value={fromYear}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col class = 'mb-3'>
                                <FormGroup>
                                    <Label>Hasta el año:</Label>
                                    <Input
                                        disabled={consultYear != null ? true:false}
                                        type="number"
                                        placeholder="Escribe un año"
                                        bind:value={toYear} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" on:click={() => {getConsult(); myToggle()}}>Consulta</Button>
                  <Button color="secondary" on:click={myToggle}>Cancelar</Button>
                </ModalFooter>
              </Modal>
        </ButtonToolbar>
        <Button outline style=position:absolute;right:0;margin-right:15px color="secondary" on:click={() => 
        {cleanFilter();infoPage("Se han limpiado los campos de consulta",true)}}>Borrar consulta</Button>
    </div>
    <Table>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Estacion</th>
            <th>Año</th>
            <th>Dia</th>
            <th>Temperatura Máxima</th>
            <th>Temperatura Mínima</th>
            <th>Temperatura Media</th>
          </tr>
        </thead>
        <tbody>
           <tr>
                <td><input bind:value={newState_s}></td>
                <td><input bind:value={newStation_s}></td>
                <td><input bind:value={newYear}></td>
                <td><input bind:value={newDay}></td>
                <td><input bind:value={newTemp_max}></td>
                <td><input bind:value={newTemp_min}></td>
                <td><input bind:value={newTemp_average}></td>
                <td><Button on:click={createAgrodata}>Crear</Button></td>
            </tr>
    
        {#each agrodata as agro}
          <tr>
            <td>{agro.state_s}</td>
            <td>{agro.station_s}</td>
            <td>{agro.year}</td>
            <td>{agro.day}</td>
            <td>{agro.temp_max}</td>
            <td>{agro.temp_min}</td>
            <td>{agro.temp_average}</td>
            <td><Button><a href="agrodata-almeria/{agro.year}/{agro.day}/{agro.station_s}">Editar</a></Button></td>
            <td
                    ><Button
                        color="danger"
                        on:click={deleteAgrodata(agro.year, agro.day, agro.station_s)}
                        >Borrar</Button
                    ></td>
            <td>&nbsp</td>
          </tr>
          {/each} 
        </tbody>
      </Table>
      <Pagination ariaLabel="Page navigation example">
        {#if v_consult}
            <PaginationItem>
                <PaginationLink style=color:#696969 first on:click={() => {firstPage();}} disabled={pagination === 0}></PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink style=color:#696969 on:click={()=>{previousPage();}} disabled={pagination === 0}>Previous</PaginationLink>
            </PaginationItem>
            <PaginationItem >
                <PaginationLink style=color:#696969 on:click={() => {countData();nextPage();}} disabled={pagination === valor}>Next</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink style=color:#696969 last on:click={()=>{lastPage();}} disabled={pagination === valor}></PaginationLink>
            </PaginationItem>
        {/if}
    </Pagination>
</main>

<style>
    .botones{
        display: flex; 
        justify-content: center;
    }
</style>
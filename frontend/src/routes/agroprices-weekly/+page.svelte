<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table, ButtonToolbar,Pagination, PaginationItem, PaginationLink,Input,Container, Row, Col } from 'sveltestrap';
        import { Modal,ModalBody,ModalFooter,ModalHeader, Alert, FormGroup, Label } from 'sveltestrap';

        onMount(async () => {
            getMarkets();
        });
        
        const toggle = () => (open = !open);
        const myToggle = () => (myOpen = !myOpen);

        let API = '/api/v1/agroprices-weekly';
        
        if(dev)
            API = 'http://localhost:12345'+ API;
            
        let mercados = [];
        let newMarket = '';
        let newProduct = '';
        let newDate = '';
        let newType = '';
        let newPrice = '';
        let newCommpos = '';
        let newUnit = '';
        let newClass = '';
    
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

        let consultMarket = null;
        let consultProduct = null;
        let consultDate= null;
        let consultType = null;
        let consultPrice = null;
        let consultCommpos = null;
        let consultUnit = null;
        let consultClass = null;

        let fromPeriod = null;
        let toPeriod = null;
    
        async function loadData() {
        resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getMarkets(); 
            }	
        }

        async function getMarkets() {
            resultStatus = result = "";
            const res = await fetch(API+"?"+"limit=10&"+"offset="+pagination*10, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                mercados = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
        async function createEntry() {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    product: newProduct,
                    type: newType,
                    class: newClass,
                    unit: newUnit,
                    market: newMarket,
                    commpos: newCommpos,
                    price: newPrice,
                    date: newDate
                })
            });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            message = "Recurso creado correctamente";
            color_alert = "success";
            getMarkets();
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
        getMarkets();	
        }

        async function deleteEntry(market, product, date) {
            resultStatus = result = "";
        const res = await fetch(API + "/" + market + "/" + product + "/" + date, {
            method: "DELETE",
        });
        const status = await res.status;
            resultStatus = status;
            if(status==200){
                getMarkets(); 
            }	
    }

    function formConsult() {
  consultAPI = '';
  if (consultMarket != null) {
    consultAPI = consultAPI + `market=${consultMarket}&`;
  }
  if (consultProduct != null) {
    consultAPI = consultAPI + `product=${consultProduct}&`;
  }
  if (consultPrice != null) {
    consultAPI = consultAPI + `price=${consultPrice}&`;
  }
  if (consultClass != null) {
    consultAPI = consultAPI + `class=${consultClass}&`;
  }
  if (consultCommpos != null) {
    consultAPI = consultAPI + `commpos=${consultCommpos}&`;
  }
  if (consultUnit != null) {
    consultAPI = consultAPI + `unit=${consultUnit}&`;
  }
  if (consultType != null) {
    consultAPI = consultAPI + `type=${consultType}&`;
  }
  if (fromPeriod != null) {
    consultAPI = consultAPI + `from=${fromPeriod}&`;
  }
  if (toPeriod != null) {
    consultAPI = consultAPI + `to=${toPeriod}&`;
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
    mercados = data;
    v_consult = false;
  } catch (error) {
    console.log(`Error en la consulta: ${error}`);
    v_warning = true;
    warning = error.message;
  }
}

function cleanFilter() {
  consultAPI = "";
  consultMarket = null;
  consultProduct = null;
  consultDate= null;
  consultType = null;
  consultPrice = null;
  consultCommpos = null;
  consultUnit = null;
  consultClass = null;
  fromPeriod = null;
  toPeriod = null;
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
            getMarkets();
        }
        function nextPage() {
            if (pagination!=valor) {
                pagination++;
                getMarkets();
            }
        }
  
        function previousPage() {
            if (pagination >= 1) {
                pagination--;
                getMarkets();
            }
        }
        function lastPage() {
            pagination=valor;
            getMarkets();
        }
        function infoPage(inf,v_inf){
            info = inf;
            v_info = v_inf;
        }
    
</script>
<main>
    <h1> Listado de datos: agroprices-weekly</h1>
    
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
                            <!-- <Col>
                                <FormGroup>
                                    <Label>Por año:</Label>
                                    <Input
                                        disabled={fromYear != null || toYear != null  ? true:false}
                                        type="number"                                     
                                        placeholder="Busqueda por un año"
                                        bind:value={consultYear}                                      
                                    />
                                </FormGroup>
                            </Col> -->
                            <Col>
                                <FormGroup>
                                    <Label>Por mercado:</Label>
                                    <Input
                                        type="text"                                       
                                        placeholder="Busqueda por un mercado"
                                        bind:value={consultMarket} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por producto:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por producto"
                                        bind:value={consultProduct}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por clase:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por clase"
                                        bind:value={consultClass}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Tipo:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por tipo"
                                        bind:value={consultType}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por Posicion comercial:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por posicion comercial"
                                        bind:value={consultCommpos}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por unidad:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por unidad"
                                        bind:value={consultUnit}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Por precio:</Label>
                                    <Input
                                        type="text"                                        
                                        placeholder="Busqueda por precio"
                                        bind:value={consultPrice}                                        
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
                                        type="text"
                                        placeholder="Escribe un año"
                                        bind:value={fromPeriod}                                        
                                    />
                                </FormGroup>
                            </Col>
                            <Col class = 'mb-3'>
                                <FormGroup>
                                    <Label>Hasta el año:</Label>
                                    <Input
                                        type="text"
                                        placeholder="Escribe un año"
                                        bind:value={toPeriod} 
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
            <th>Producto</th>
            <th>Tipo</th>
            <th>Clase</th>
            <th>Unidad</th>
            <th>Mercado</th>
            <th>Posición Comercial</th>
            <th>Precio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
           <tr>
            <td><input bind:value={newProduct}></td>
            <td><input bind:value={newType}></td>
            <td><input bind:value={newClass}></td>
            <td><input bind:value={newUnit}></td>
            <td><input bind:value={newMarket}></td>
            <td><input bind:value={newCommpos}></td>
            <td><input bind:value={newPrice}></td>
            <td><input bind:value={newDate}></td>
            <td><Button on:click={createEntry}>Crear</Button></td>
            </tr>
    
            {#each mercados as mercado}
            <tr>
              <td>{mercado.product}</td>
              <td>{mercado.type}</td>
              <td>{mercado.class}</td>
              <td>{mercado.unit}</td>
              <td>{mercado.market}</td>
              <td>{mercado.commpos}</td>
              <td>{mercado.price}</td>
              <td>{mercado.date}</td>
              <td><Button><a href="agroprices-weekly/{mercado.market}/{mercado.product}/{mercado.date}">Editar</a></Button></td>
              <td
                      ><Button
                          color="danger"
                          on:click={deleteEntry(mercado.market, mercado.product, mercado.date)}
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
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
        let newState_s = 'Sevilla';
        let newStation_s = 'Olivares';
        let newYear = '2023';
        let newDay = '1';
        let newTemp_max = '1000';
        let newTemp_min = '1000';
        let newTemp_average = '1000';
        let message = "";
    
        let result = "";
        let resultStatus = "";
        let color_alert = "";

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
        let pagina = 1;

        let search_station_s = "";
        let search_year = 0;
        let search_day = 0;
        let search = {
        temp_max_: "",
        temp_min: "",
        temp_average: "",
        from: "",
        to: "",
    }

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
        let limit = 10;
        let offset = (pagina - 1) * limit;
        let query = `?limit=${limit}&offset=${offset}`;
        var params = query;
        var params_ids = "";
        for (const [key, value] of Object.entries(search)) {     
                    if (value != ""){
                    params += "&" + key + "=" + value;}
        }
        resultStatus = result = "";
        if(search_year && search_day && search_station_s){
            params_ids = "/" + search_year + "/" + search_day + "/" + search_station_s + params;
        }else{
            if(search_year){
                params_ids = params + "&year=" + search_year ;
            }if(search_day){
                params_ids = params + "&day=" + search_day ;
            }else{
                if(search_station_s){
                    params_ids = params + "&station_s=" + search_station_s ;
                }else{
                    params_ids = params;
                }
            }
        }
        const res = await fetch(API + params_ids, {
            method: "GET",
        });
        try {
            const status = await res.status;
                if (status === 404) {
                    agrodata = [];
                }
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            agrodata = data;
            } catch (error) {
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
        if (status == 201 || status == 204) {
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
        const status = await res.status;
        resultStatus = status;
            if(status==200 || status == 204){
                getAgrodata(); 
            }	
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

        async function previousPage() {
        if (pagina > 1) { 
        pagina--;
        getAgrodata()
        }else{
            message = "Estás en la primera página";
            color_alert = "danger";
            open = false;
        }
    }
    async function nextPage() {
        if (agrodata.length >= 10) {
            pagina++;
            getAgrodata();
         }else{
            message = "No hay más páginas";
            color_alert = "danger";
            open = false;
         }
                      
    }

</script>
<main>
    <h1> Listado de datos: agrodata-almeria</h1>
    
    <div class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button outline on:click={deleteAll}>Borrar Datos</Button>
        </ButtonToolbar>
    </div>
    <Table bordered striped>
        <thead>
            <tr>
                <th>Estacion</th>
                <th>Año</th>
                <th>Día</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Temperatura máxima menor</th>
                <th>Temperatura mínima menor</th>
                <th>Temperatura media menor</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={search_station_s} /></td>
                <td><input bind:value={search_year} /></td>
                <td><input bind:value={search_day} /></td>
                <td><input bind:value={search.from} /></td>
                <td><input bind:value={search.to} /></td>
                <td><input bind:value={search.temp_max} /></td>
                <td><input bind:value={search.temp_min} /></td>
                <td><input bind:value={search.temp_average} /></td>
                <td>
                    <Button color="success" on:click={getAgrodata}>Buscar</Button>
                </td>
            </tr>
        </tbody>
    </Table>
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
      <Row>
        <Col xs="5">
        </Col>
        <Col xs="4">
            <Button on:click={previousPage}>&lt;</Button>
            <span>Página: {pagina}</span>
            <Button on:click={nextPage}>&gt;</Button>
        </Col>
    </Row>
</main>

<style>
    .botones{
        display: flex; 
        justify-content: center;
    }
</style>
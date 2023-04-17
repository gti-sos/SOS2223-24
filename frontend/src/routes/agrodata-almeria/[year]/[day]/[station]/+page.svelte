<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table, Col, Row, Alert } from 'sveltestrap';
        import { page } from '$app/stores';
        onMount(async () => {
            getRecurse();
        });
        
        let year = $page.params.year;
        let day = $page.params.day;
        let station = $page.params.station;
        let API = "/api/v1/agrodata-almeria" + "/" + year + "/" + day+ "/" + station;
        
        if(dev)
            API = 'http://localhost:12345'+API
        
        let updatedState = "";
        let updatedStation = station;
        let updatedYear = year;
        let updatedDay = day;
        let updatedTemp_max = 0;
        let updatedTemp_min = 0;
        let updatedTemp_average = 0;
   
        
        let message = "";
        let color_alert = "";
        let result = "";
        let resultStatus = "";
    
        async function getRecurse () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2); 
                updatedState = data.state_s;
                updatedStation = data.station_s;
                updatedYear = data.year;
                updatedDay = data.day;
                updatedTemp_max = data.temp_max;
                updatedTemp_min = data.temp_min;       
                updatedTemp_average = data.temp_average; 
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
        async function updateRecurse () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'PUT',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    state_s: updatedState,
                    station_s : updatedStation,
                    year: updatedYear,
                    day: updatedDay,
                    temp_max: updatedTemp_max,
                    temp_min: updatedTemp_min,
                    temp_average: updatedTemp_average
                })
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==200){
                getRecurse();
            }
        }
</script>

<div class="cabecera">
    <Row >
        <Col xs="3">
            <h2>Detalles del recurso</h2>
        </Col>
        <Col xs="3"> 
            {#if message != ""}
            <Alert fade={true} color={color_alert} dismissible>{message}</Alert>
        {/if}
        </Col>
    </Row>
</div>

<Table bordered striped>
    <thead>
        <tr>
            <th>Estacion</th>
            <th>Año</th>
            <th>Dia</th>
            <th>Provincia</th>
            <th>Temperatura Máxima</th>
            <th>Temperatura Míxima</th>
            <th>Temperatura Media</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{updatedStation} </td>
            <td>{updatedYear} </td>
            <td>{updatedDay} </td>
            <td>{updatedState}</td>
            <td><input bind:value={updatedTemp_max} /></td>
            <td><input bind:value={updatedTemp_min} /></td>
            <td><input bind:value={updatedTemp_average} /></td>
            <td><Button color="primary" on:click={updateRecurse}>Actualizar</Button></td>
        </tr>
    </tbody>
</Table>


<style>
    .cabecera {
        margin-top: 1%;
        margin-left: 1.5%;
        margin-bottom: 1%;
    }
</style>
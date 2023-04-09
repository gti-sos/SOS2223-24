<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table, ButtonToolbar } from 'sveltestrap';
        onMount(async () => {
            getAgrodata();
        });
        
        let API = '/api/v1/agrodata-almeria';
        
        if(dev)
            API = 'http://localhost:12345'+API
            
        let agrodata = [];
        let newState_s = 'Province';
        let newStation_s = 'Station';
        let newYear = 'year';
        let newDay = 'day';
        let newTemp_max = 'temp_max';
        let newTemp_min = 'temp_min';
        let newTemp_average = 'temp_average';
        let message = "";
    
        let result = "";
        let resultStatus = "";
    
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
            const res = await fetch(API, {
                method: 'GET'
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
            if(status==201){
                getAgrodata();
            } 
            if(status==200){
                getAgrodata();
            }
        }

        async function deleteAgrodata(year,day,station) {
            resultStatus = result = "";
            const res = await fetch(API+"/"+year+"/"+day+"/"+station, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==200){
                getAgrodata(); 
            }
        }
    
</script>
<main>
    <h1> Listado de datos: agrodata-almeria</h1>
    
    <div class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
        </ButtonToolbar>
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
            <td><Button><a href='agrodata-almeria/{agro.year}/{agro.day}/{agro.station_s}'>Editar</a></Button></td>
            <td><Button on:click={deleteAgrodata(`${agro.year}/${agro.day}/${agro.station_s}`)}>Borrar</Button></td>
            <td>&nbsp</td>
          </tr>
          {/each} 
        </tbody>
      </Table>

      {#if message != ""}
      <h1 style="color:red">{message}</h1>
      {/if}
      
    {#if resultStatus != ""}
        <p>
            Resultado:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}

</main>

<style>
    .botones{
        display: flex; 
        justify-content: center;
    }
</style>
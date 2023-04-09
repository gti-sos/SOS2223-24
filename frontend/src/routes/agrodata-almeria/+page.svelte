
<script>
    // @ts-nocheck
        import { ButtonToolbar } from 'sveltestrap';
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table } from 'sveltestrap';
        import { Modal,ModalBody,ModalFooter,ModalHeader } from 'sveltestrap';
        
        let open = false;
        const toggle = () => (open = !open);
        onMount(async () => {
            getData();
        });
        
        let API = '/api/v1/agrodata-almeria';
        
        if(dev)
            API = 'http://localhost:12345'+API
        
        
            
        let agrodata = [];
        let newState_s = 'state_s';
        let newStation_s = 'station_s';
        let newYear = 'year';
        let newDay = "day";
        let newTemp_max= "temp_max";
        let newTemp_min = "temp_min";
        let newTemp_average = "temp_average"
    
        let result = "";
        let resultStatus = "";
    
        async function loadData() {
            let currentUrl = window.location.href;
            
            // Redirigimos al usuario a la URL deseada
            window.location.href = "http://localhost:12345/api/v1/agrodata-almeria/loadInitialData";
            
            // Esperamos a que se complete la redirección y se carguen los datos
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirigimos al usuario de vuelta a la URL original
            window.location.replace(currentUrl);
        }
        async function getData() {
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
      
        async function putData(year,day,station) {
  const response = await fetch(`${API}/${year}/${day}/${station}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ state_s: newState_s
                ,station_s: newStation_s
                ,year: newYear
                ,day: newDay
                ,temp_max: newTemp_max
                ,temp_min: newTemp_min
                ,temp_average: newTemp_average})
                });
  const result = await response.json();
  // Do something with the result
  console.log(result);
}
        async function deleteData(){
            resultStatus = result = "";
            const res = await fetch(API+"/"+data, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==200){
                getData();
                console.log("Dato borrado: "+data) 
            }
        }

        async function deleteAllData() {
            
            try {
                const res = await fetch(API, {
                method: 'DELETE',
                });
                const status = await res.status;
                if (status === 204) {
                console.log('Todos los datos han sido eliminados.');
                }
            } catch (err) {
                console.error('Ha ocurrido un error al eliminar los datos: ', err);
            }
        }
        async function createData () {
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
                getData();
                location.reload()
            }
        }
    
</script>
<main>
    <h1>Api of Agrodata-almeria</h1>
    <hr>

    
    <div class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button outline on:click={toggle}>Borrar todos los datos</Button>
            <Modal isOpen={open} {toggle}>
            <ModalHeader {toggle}>Eliminar Datos</ModalHeader>
            <ModalBody>
                ¿Estás seguro que quieres eliminar todos los datos?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" on:click={() => { deleteAllData(); toggle(); location.reload()}}>Eliminar</Button>
                <Button color="secondary" on:click={toggle}>Cancelar</Button>
            </ModalFooter>
            </Modal>
        </ButtonToolbar>
    </div>

    <div>
        
      </div>
    
    <div class="tabla">
        <Table hover>
            <thead>
              <tr>
                <th>Province</th>
                <th>Station</th>
                <th>Year</th>
                <th>Day</th>
                <th>Maximun Temperature</th>
                <th>Minimun Temperature</th>
                <th>Average Temperature</th>
                <th>Action</th>
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
                    <td><Button on:click={createData}>Create</Button></td>
                    
                </tr>
        
            {#each agrodata as datos}
              <tr>
                <td>{datos.state_s}</td>
                <td>{datos.station_s}</td>
                <td>{datos.year}</td>
                <td>{datos.day}</td>
                <td>{datos.temp_max}</td>
                <td>{datos.temp_min}</td>
                <td>{datos.temp_average}</td>
                <td>
                <ButtonToolbar>
                    <Button on:click={editData}>Edit</Button>
                    <Button on:click={deleteData}>Delete</Button>
                </ButtonToolbar>
                </td>
                <td>&nbsp</td>
              </tr>
              {/each} 
            </tbody>
          </Table>
    
          
        {#if resultStatus != ""}
            <p>
                Result:
            </p>
            <pre>
    {resultStatus}
    {result}
            </pre>
        {/if}
    </div>
    
</main>
    
    
    
<style>
    .botones{
        display: flex; 
        justify-content: center;
    }
</style>


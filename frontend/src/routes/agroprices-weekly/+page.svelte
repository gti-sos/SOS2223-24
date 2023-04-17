<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table, ButtonToolbar } from 'sveltestrap';
        onMount(async () => {
            getMarkets();
        });
        
        let API = '/api/v1/agroprices-weekly';
        
        if(dev)
            API = 'http://localhost:12345'+ API;
            
        let mercados = [];
    // state_s -> market
    // station_s -> product
    // temp_max -> type
    // year -> date
    // temp_min -> price
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
    
        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            agroprices = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 400) {
            message = "Ha habido un error en la petición";
            color_alert = "danger";
        } else if (status == 200) {
            message = "Datos iniciales cargados correctamente";
            color_alert = "success";
            getMarkets();
        } else if (status == 201){
            message = "Ya hay datos cargados";
            color_alert = "danger";
        }
    }

        async function getMarkets() {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                agroprices = data;
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
        const status = await res.status;
        resultStatus = status;
            if(status==200){
                getMarkets(); 
            }
    }

        async function deleteEntry(market, product, date) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + market + "/" + product + "/" + date, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            message = "Recurso borrado correctamente";
            color_alert = "success";
            getMarkets();
        }
    }
    
</script>
<main>
    <h1> Listado de datos: agroprices-weekly</h1>
    
    <div class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button outline on:click={deleteAll}>Borrar Datos</Button>
        </ButtonToolbar>
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
</main>

<style>
    .botones{
        display: flex; 
        justify-content: center;
    }
</style>
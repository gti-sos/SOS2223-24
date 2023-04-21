<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {
        Button,
        Table,
        Alert, Col, Row
    } from "sveltestrap";    
    import { page } from "$app/stores";


    onMount(async () => {
        getProvision();
    });

    let province = $page.params.province;
    let year = $page.params.year;
    let disposal_number = $page.params.disposal_number;



    let API = '/api/v2/provisions-for-the-year-2014' + "/" + province + '/' + year + '/' + disposal_number;
    if(dev) API = 'http://localhost:12345' + API;


    let newProvince, newYear, newOrganization, newDisposal_type, newDisposal_number, newNumber_of_the_bulletin, newDate_of_disposition, newSection_number, newSection;
    newProvince= province;
    newYear= year;
    newDisposal_number = disposal_number; 
    newOrganization= newDisposal_type= newNumber_of_the_bulletin= newDate_of_disposition= newSection_number= newSection = "";



    let message = "";
    let color_alert;
    let result = "";
    let resultStatus = "";
    async function getProvision() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            newProvince = data.province;
            newYear = data.year;
            newOrganization = data.organization;
            newDisposal_type = data.disposal_type;
            newDisposal_number = data.disposal_number;
            newNumber_of_the_bulletin = data.number_of_the_bulletin;
            newDate_of_disposition = data.date_of_disposition;
            newSection_number = data.section_number;
            newSection = data.section;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if(status == 404){
            message = `No existe ninguna disposicion con número ${newDisposal_number} para la provincia: ${newProvince}, en el año: ${newYear}.`;
            color_alert = "danger";
        }else{
            if(status == 400){
                message = "Ha habido un error en la petición";
                color_alert = "danger";
            }
        }
    }
    function volverAtras (){
        return history.back()
    }
    async function PutProvision() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                province: newProvince,
                year:newYear,
                organization: newOrganization,
                disposal_type: newDisposal_type,
                disposal_number: newDisposal_number,
                number_of_the_bulletin: newNumber_of_the_bulletin,
                date_of_disposition: newDate_of_disposition,
                section_number: newSection_number,
                section: newSection,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            message = "Recurso actualizado correctamente";
            color_alert = "success";
            open = false;
            getProvision();
        }else{
            if(status == 404){
            message = `No hay ningún recurso para esta provincia y este año.`;
            color_alert = "danger";
            }else{
                if(status == 400){
                    message = "Ha ocurrido un fallo en la aplicacion";
                    color_alert = "danger";
                }else{
                    if(status == 409){
                        message = "La provincia debe estar dentro de Andalucia";
                        color_alert = "danger";
                    }
                }
            }
        }
    }
        
</script>


<div class="cabecera">

    <Row> 
        {#if message != ""}
        <Alert fade={true} color={color_alert} dismissible>{message}</Alert>
    {/if}
</Row>
    
</div>
<div  class = "wp">
    <Table>
        <thead>
            <tr>
                <th>Provincia</th>
                <th>Año</th>
                <th>Número de Disposición</th>
                <th>Organización</th>
                <th>Tipo de disposición</th>
                <th>Número del Boletín</th>
                <th>Fecha de disposición</th>
                <th>Número de sección</th>
                <th>Sección</th>
            </tr>
        </thead>
        <tbody>
            <tr>

                <td style="color: #888;">{province}</td>
                <td style="color: #888;">{year}  </td>
                <td style="color: #888;">{disposal_number}  </td>
                <td><input bind:value={newOrganization} style="color: #888;" /></td>
                <td><input bind:value={newDisposal_type} style="color: #888;" /></td>
                <td><input bind:value={newNumber_of_the_bulletin} style="color: #888;" /></td>
                <td><input bind:value={newDate_of_disposition} style="color: #888;" /></td>
                <td><input bind:value={newSection_number} style="color: #888;" /></td>
                <td><input bind:value={newSection} style="color: #888;" /></td>
                <td><Button color="primary" on:click={PutProvision}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <Button color="secondary" on:click={volverAtras} >Volver Atras</Button>

</div>
<script>
    import { dev } from '$app/environment';
    let API = '/api/v1';
    let APIf='';
    if (dev)
        API = 'http://localhost:12345'+API;
        APIf = 'http://localhost:12345';

</script>
<main>
    <br>
    <h1 style="padding-left: 10px;">SOS2223-23</h1>
    <ul>
        <li><b>Equipo:</b></li>
        <br>
        <ul>
            <li><a href="https://github.com/AdolfoRdgzCab">Adolfo Rodriguez Cabezon - agrodata-almeria </a></li>
            <li><a href="https://github.com/vicsanesp">Victor Manuel Sanchez Espada - agroprices-weekly</a></li>
            <li><a href="https://github.com/OUABSL">Ouael Boussiali - provisions-for-the-year-2014</a></li>
        </ul>
        <br>
        <br>
        <li><dl>
            <dt><b>Descripción del proyecto:</b></dt>
            <br>
            <di>Comparison of the prices of agricultural products by area based on the number of greenhouses in the province </di>
        </dl></li>
        <br>
        <br>
        <li><b>Repositorio de GitHub: </b><a href="https://github.com/gti-sos/SOS2223-24">gti-sos/SOS2223-24</a></li>
        <br>
        <br>
        <li><b>URL de la API: </b><a href="https://sos2223-24.ew.r.appspot.com">gti-sos/SOS2223-24/API</a></li>
        <br>
        <br>
        <li><b>Documentacion de las APIS:</b></li>
        <br>
        <ul>
            <li><a href="{API}/agrodata-almeria/docs">Documentacion agrodata-almeria</a> (developed by Adolfo Rodriguez Cabezon)</li>
            <li><a href="{API}/agroprices-weekly/docs">Documentacion agroprices-weekly</a> (developed by Victor Manuel Sanchez Espada)</li>
            <li><a href="{API}/provisions-for-the-year-2014/docsv1">Documentacion provisions-for-the-year-2014 V1</a> (developed by Ouael Boussiali)</li>
            <li><a href="{API}/provisions-for-the-year-2014/docsv2">Documentacion provisions-for-the-year-2014 V2</a> (developed by Ouael Boussiali)</li>

        </ul>
        <br>
        <li><b>Frontends de las APIS:</b></li>
        <br>
        <ul>
            <li><a href="{APIf}/agrodata-almeria">Frontend de agrodata-almeria</a> (developed by Adolfo Rodriguez Cabezon)</li>
            <li><a href="{APIf}/provisions-for-the-year-2014">Frontend de provisions-for-the-year-2014</a> (developed by Ouael Boussiali)</li>
            <li><a href="{APIf}/agroprices-weekly">Frontend de agroprices-weekly</a> (developed by Víctor Manuel Sánchez Espada)</li>


        </ul>
    </ul>
</main>
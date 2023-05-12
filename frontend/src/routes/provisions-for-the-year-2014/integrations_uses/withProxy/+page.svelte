<script>
    //@ts-nocheck
    import { onMount } from "svelte";


    let datos = "";


    onMount(async () => {
        getDataComp();
    });

    let API_Comp = "https://sos2223-24.appspot.com/api/v2/bicycle-plans";
    let API ="https://sos2223-24.appspot.com/api/v2/provisions-for-the-year-2014";

    
    let result = "";
    let resultStatus = "";


    let id = "";
    let datos_comp = [];


    async function getDataComp() {
        try {
      const res = await fetch(API_Comp, {
        method: 'GET'
      });
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      data = dataReceived;
      const status = await res.status;
      resultStatus = status;
      delay(500);
      
      
      const populationByProvince = data.reduce((acc, cur) => {
            const { province, population } = cur;
            if (!acc[province]) {
            acc[province] = { province, population };
            }
            return acc;
        }, {});

        const datos_comp = Object.values(populationByProvince).map((d) => [
            `${d.province}`,
            d.population,
        ]);
        console.log(datos_comp);

        getData(datos_comp);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
   

    }   

async function getData(datos_comp) {
    resultStatus = result = "";
    try {
      const res = await fetch(API + "/data", {
        method: 'GET'
      });
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      data = dataReceived;
      const status = await res.status;
      resultStatus = status;
      loadCharts(data);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }

  }


    function loadcharts(data) {
        const labels = data.map((d) => d[0]);
        const populationData = data.map((d) => d[1]);
        const provisionData = data.map((d) => d[2]);

        const ctx = document.getElementById("myChart").getContext("2d");
        const chart = new Chart(ctx, {
            type: "bar",
            data: {
            labels,
            datasets: [
                {
                label: "Population",
                data: populationData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                },
                {
                label: "Provision Count",
                data: provisionData,
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });
    }



</script>

<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>
<main>
    <div style="margin-left: 30px;">
        <h2 style="text-align:center; font-style: oblique;">Gráfica ocupación de apartamentos y agroclimática</h2>
        <p style="text-align:center">Fuentes: <a style="text-decoration: none; color:black" href="https://sos2223-14.appspot.com/api/v2/apartment-occupancy-surveys" target="_blank"><u>API Ocupación de apartamentos en Andalucía</u></a> y  <a style="text-decoration: none; color:black" href="https://sos2223-12.appspot.com/api/v2/agroclimatic" target="_blank"><u>API Agroclimaticas</u></a></p>
        <p style="text-align:center">Gráfica con: <a style="text-decoration: none; color:black" href="https://jscharting.com/" target="_blank"><u>JSCharting</u></a></p>
        <p style="text-align:center">tipo: columna</p>
    </div>
    <div id="chartDiv" style="width:1500px; height:600px; margin: 0px auto; margin-top:40px">
    </div>
</main>
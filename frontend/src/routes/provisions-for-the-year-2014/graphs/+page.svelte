<svelte:head>

  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  let API = '/api/v2/provisions-for-the-year-2014';
  if (dev) API = 'http://localhost:12345' + API;

  let data = [];
  let result = "";
  let resultStatus = "";
  onMount(async () => {
    await getData();
    await getData2();
  });

  async function getData() {
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

  var provincias = [];
  var numero_provisiones = [];

  async function getData2(){

    resultStatus = result = "";
    const res = await fetch(API, {
        method: "GET"
    });
    if(res.ok){
        try{
            const provisions = await res.json();

            const dic = provisions.reduce((res, actual) => { //Agrupar por provincia
                const prov = actual.province;
                res[prov] = res[prov] || [];
                res[prov].push(actual);
                return res;
            }, {} ); // inicializar el res
            
            const groupedArray = Object.keys(dic).map(key => dic[key]);
            const provinciaLengths = {};
            let totalProvisions = 0;

            groupedArray.forEach(p =>{ //agrupar por provincia: numero de  provisiones 
                provincias.push(p[0]["province"]);
                const numProvisions = p.length;
                numero_provisiones.push(numProvisions);
                provinciaLengths[p[0]["province"]] = numProvisions;
                totalProvisions += numProvisions;
            });
            let percentage = {};
            Object.keys(provinciaLengths).forEach(prov => { // cambiar el numero de provisiones por su porcentage
              percentage[prov] = (provinciaLengths[prov] / totalProvisions) * 100;
            });
            const chartData = Object.entries(percentage).map(([province, porcentage]) => ({
              name: province,
              y: Number(porcentage.toFixed(2)),
            }));
            
      loadCharts2(chartData); 
      }catch(error){
            console.log(`Error devolviendo la gráfica: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }else{
        console.log("Error al cargar la gráfica");
    }
  }

  async function loadCharts(graphData) {
    const chartData = graphData.map(({province, provisions_number }) => ({
      y: provisions_number,
      label: province
    }));

    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Provisiones en Andalucía"
      },
      axisY: {
        title: "Número de provisiones"
      },
      data: [{
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "Provisiones por provincia",
        dataPoints: chartData
      }]
    });
    chart.render();
  }

  async function loadCharts2(graphData){

    // Create the chart
    Highcharts.chart('container', {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Provisiones',
          align: 'left'
      },
      subtitle: {
          text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
          align: 'left'
      },

      accessibility: {
          announceNewData: {
              enabled: true
          },
          point: {
              valueSuffix: '%'
          }
      },

      plotOptions: {
          series: {
              borderRadius: 5,
              dataLabels: {
                  enabled: true,
                  format: '{point.name}: {point.y:.1f}%'
              }
          }
      },

      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
          {
              name: 'Provincias',
              colorByPoint: true,
              data: graphData
          }
      ]

      
    });

  }


</script>

<main>
  
  <h1 style="margin-top: 30px;">Grafo 1: Número de Provisiones en cada Provincia</h1>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>


  <h1 style="margin-top: 30px;">Grafo 2: Provisiones Por Provincia</h1>
    <figure class="highcharts-figure">
      <div id="container"></div>
  
</figure>
</main>

<style>



  #container {
    height: 400px;
}

.highcharts-figure {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
}


</style>
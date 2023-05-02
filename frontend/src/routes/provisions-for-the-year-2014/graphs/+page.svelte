<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import { dev } from '$app/environment';

  let API = '/api/v2/provisions-for-the-year-2014/data';
  if (dev) API = 'http://localhost:12345' + API;

  let data = [];
  let result = "";
  let resultStatus = "";

  async function getData() {
    resultStatus = result = "";

    try {
      const res = await fetch(API, {
        method: 'GET'
      });
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      data = dataReceived;
      loadCharts(data);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }

    const status = await res.status;
    resultStatus = status;
  }

  function loadCharts(graphData) {
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

  onMount(async () => {
    await getData();
  });
</script>

<main>
  <h1>Graph</h1>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</main>

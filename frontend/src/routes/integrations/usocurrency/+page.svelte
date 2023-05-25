<svelte:head>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
  <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
  <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">
</svelte:head>

<script>
  //@ts-nocheck

  import { onMount } from "svelte";
  import { dev } from "$app/environment";


  let datos = "";

  onMount(async () => {
    await getData();
  });

  let API = "/api/v2";
  if (dev) API = "http://localhost:12345" + API;

  async function getData() {
    const res = await fetch(API + "/uso_currency");

    try {
      const datos = await res.json();
      const status = await res.status;

      const dataArray = datos.result.data;
      let chartData = [];

      dataArray.forEach((moneda) => {
        const name = moneda.code;
        const value = moneda.calculated;
        if (value < 10) {
          let cur = [name, value];
          chartData.push(cur);
        }
      });

      loadData(chartData);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  function loadData(chartData) {
    anychart.onDocumentReady(function () {
      // create column chart
      var chart = anychart.column();

      // turn on chart animation
      chart.animation(true);

      // set chart title text settings
      chart.title('Comparación de EURO con las Mejores Monedas en el Mundo');

      // create area series with passed data
      var series = chart.column(chartData);

      // set series tooltip settings
      series.tooltip().titleFormat('{%X}');

      series
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .offsetX(0)
        .offsetY(5)
        .format('${%Value}{groupsSeparator: }');

      // set scale minimum
      chart.yScale().minimum(0);

      // set yAxis labels formatter
      chart.yAxis().labels().format('${%Value}{groupsSeparator: }');

      // tooltips position and interactivity settings
      chart.tooltip().positionMode('point');
      chart.interactivity().hoverMode('by-x');

      // axes titles
      chart.xAxis().title('Moneda');
      chart.yAxis().title('Valor');

      // set container id for the chart
      chart.container('container');

      chart.width('600px');
      chart.height('400px');

      // initiate chart drawing
      chart.draw();
    });
  }
</script>

<body style="height: 70vh; padding: 20px;">

  <div id="container"></div>

</body>

<style>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  #container {
    width: 100%;
    max-width: 500px;
    height: 400px;
  }
</style>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
  //@ts-nocheck

  import { onMount } from "svelte";
  import { dev } from "$app/environment";

  let datos = [];

  onMount(async () => {
    await getData();
  });

  let API = "/api/v2";
  if (dev) API = "http://localhost:12345" + API;

  async function getData() {
    try {
      const res = await fetch(API + "/homicide_rate");
      datos = await res.json();

      const chartData = [];
      let cont = 0;

      datos.forEach((item) => {
        const city = item.City;
        const homicides = item["Homicides (2019)"];

        if (cont > 5 && city && homicides > 100) {
          const dataItem = {
            name: city,
            y: Number(homicides)
          };
          chartData.push(dataItem);
        }
        cont++;
      });

      console.log(JSON.stringify(chartData, null, 2));

      loadData(chartData);
      console.log(chartData);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  function loadData(chartData) {
    // Create the chart
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Número de Homicidios en 2019 por Ciudad'
      },
      subtitle: {
        text: 'Haz clic en las columnas para ver más información.'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Ciudad'
        }
      },
      yAxis: {
        title: {
          text: 'Número de Homicidios en 2019'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}'
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
      },
      series: [
        {
          name: 'Ciudad',
          colorByPoint: true,
          data: chartData
        }
      ]
    });
  }
</script>

<body style="height: 70vh; padding: 20px; ">
  <figure class="highcharts-figure">
    <div id="container"></div>
  </figure>
</body>

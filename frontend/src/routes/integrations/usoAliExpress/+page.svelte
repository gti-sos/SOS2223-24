<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
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
    const res = await fetch(API + "/uso_sales");

    try {
      const datos = await res.json();
      const status = await res.status;

      const resultList = datos.result.resultList;
      let chartData = [];

      resultList.forEach((item) => {
        const itemId = item.item.title.split(' ').slice(0, 4).join(' ');
        const sales = parseInt(item.item.sales); // Convertir a número
        let obj = {
          y: sales,
          label: itemId,
        };

        chartData.push(obj);
      });

      loadData(chartData);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  function loadData(chartData) {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Venatas de Mi tienda",
        horizontalAlign: "left",
      },
      data: [
        {
          type: "doughnut",
          startAngle: 60,
          indexLabelFontSize: 17,
          indexLabel: "{label} - #percent%",
          toolTipContent: "<b>{label}:</b> {y} (#percent%)",
          dataPoints: chartData,
        },
      ],
    });
    chart.render();
  }
</script>

<body style="height: 65vh; padding: 20px;">
  
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</body>

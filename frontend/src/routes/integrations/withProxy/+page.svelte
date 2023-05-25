<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";


  let result = "";

  onMount(async () => {
    getDataComp();
  });

  let API_Comp = "https://sos2223-24.appspot.com/api/proxyoua";    
  
  let API = "/api/v2/provisions-for-the-year-2014";
  if (dev){
     API = "http://localhost:12345" + API;
} 
  let resultStatus = "";
  const delay = d => new Promise(res => setTimeout(res, d));

  async function getData(datos_comp) {
    const res = await fetch(API + "/data", {
  
        method: 'GET'
      });
    resultStatus = result = "";
    try {
      const dataReceived = await res.json();
      const status = await res.status;
      result = JSON.stringify(dataReceived, null, 2);

      const data = dataReceived;
      resultStatus = status;
      await delay(500);
      let chartData = [];
      chartData = data.map(({province, provisions_number}) => ({
      y: Number(provisions_number) * 10000,
      label: province.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }));





      loadCharts(chartData, datos_comp);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  async function getDataComp() {
    const res = await fetch(API_Comp, {
        method: 'GET'
      });
    try {

      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      const data = dataReceived;
      const status = await res.status;
      resultStatus = status;

      const chartData_comp = data.map((i)=>{
          return {
            label:i.province,
            y:i.population
          };
    });
    const chartData_unique = chartData_comp.filter((obj, index, arr) => {
      return (
        index === arr.findIndex((t) => {
          return t.label === obj.label ;
        })
      );
    });

    let cmp = ["almeria", "cadiz", "cordoba", "granada", "huelva", "jaen", "malaga", "sevilla"]



    const chartData_ordered = chartData_unique.sort((a, b) => {
      return cmp.indexOf(a.label.toLowerCase()) - cmp.indexOf(b.label.toLowerCase());
    });

      getData(chartData_unique);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  async function loadCharts(chartData, chartData_comp) {
  var chart = new CanvasJS.Chart("myChart", {
    animationEnabled: true,
    title:{
      text: ""
    },
    axisY: {
      title: "Medals",
      includeZero: true
    },
    legend: {
      cursor:"pointer",
      itemclick : toggleDataSeries
    },
    toolTip: {
      shared: true,
      content: toolTipFormatter
    },
    data: [{
      type: "bar",
      showInLegend: true,
      name: "Provisiones",
      color: "red",
      dataPoints: chartData
    },
    {
      type: "bar",
      showInLegend: true,
      name: "Populación",
      color: "silver",
      dataPoints: chartData_comp
    },
]
  });
  chart.render();

  function toolTipFormatter(e) {
    var str = "";
    var str3;
    var str2 ;
    let total = 0;
    for (var i = 0; i < e.entries.length; i++){
      var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
    str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
    return (str2.concat(str));
  }

  function toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
    e.dataSeries.dataPoints.forEach((dataPoint) => {
      dataPoint.color = "gray";
    });
  } else {
    e.dataSeries.visible = true;
    e.dataSeries.dataPoints.forEach((dataPoint) => {
      dataPoint.color = e.dataSeries.color;
    });
  }
  chart.render();
}

  }

</script>

<main>
  <h1 style="margin-top: 30px;">Número de Provisiones frente a la población en cada Provincia</h1>
  <div id="myChart" style="height: 300px; width: 100%;"></div>
</main>

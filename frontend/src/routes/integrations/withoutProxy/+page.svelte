<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";



  onMount(async () => {
    getDataComp();
  });

  let API_Comp = "https://sos2223-14.appspot.com/api/v2/apartment-occupancy-surveys";
  
  let API = "/api/v2/provisions-for-the-year-2014";
  if (dev) API = "http://localhost:12345" + API;
  let result = "";
  let resultStatus = "";
  const delay = d => new Promise(res => setTimeout(res, d));



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

    
      let chartData_comp = data.map((i)=>{     
        return {label:i.province, y:i.traveler};
        });

        console.log("comp:   "+JSON.stringify(chartData_comp, null, 2));

      const chartData_unique = chartData_comp.filter((obj, index, arr) => {
          return (
            index === arr.findIndex((t) => {
            return t.label === obj.label ;
        })
      );    });

      console.log("unico : "+JSON.stringify(chartData_unique, null, 2));

      let cmp = ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'];

    
      const chartData_ordered = chartData_unique.sort((a, b) => {    
        return cmp.indexOf(a.label) - cmp.indexOf(b.label);

    });

      console.log("datoooooos ; "+JSON.stringify(chartData_ordered, null, 2));
      getData(chartData_ordered);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  async function getData(chartData_comp) {
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
      chartData = data;

      loadCharts(chartData, chartData_comp);




    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  async function loadCharts(chartData, chartData_comp){

    chartData = chartData.map(({province, provisions_number}) => ({
        label: province,
        y: Number(provisions_number) * 10000
           

   
        }));
    console.log(JSON.stringify(chartData_comp, null, 2));

    //console.log(JSON.stringify(chartData, null, 2));



        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,	
            title:{	
                text: "PROVISIONES FRENTE A TÚRISTAS EN ANDALUCÍA"             
            }, 
            axisY:{
                title: "NÚMERO "
            },
            toolTip: {
                shared: true
            },
            legend:{
                cursor:"pointer",
                itemclick: toggleDataSeries
            },
            data: [
		    {        
		
                type: "spline",  
                name: "Turístas",        
                showInLegend: true,
                dataPoints: chartData_comp
            },  
            {       
                type: "spline",  	
                name: "Provisiones",                
                showInLegend: true,	
                dataPoints: chartData
	}]

            
});

chart.render();

function toggleDataSeries(e) {
	if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;            
	}
	chart.render();
}

}


  

</script>

<body style="height: 70vh; padding: 20px; margin-top: 40px">
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</body>

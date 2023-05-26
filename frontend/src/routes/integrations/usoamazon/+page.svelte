<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/cylinder.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    //@ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let data = [];

    onMount(async () => {
        await getData();
    });

    let API = "/api/v2";
    if (dev) API = "http://localhost:12345" + API;

    async function getData() {
        const res = await fetch(API + "/amazondata");

        try {
            data = await res.json();
            const chartData = [];

            let datos = data.products;
            datos.forEach((item) => {
            let nd = item.name.split(",");
            const name = nd[0];
            const price = item.price.currentPrice;

            const ls = [name, price];
                chartData.push(ls);
            });

            loadData(chartData);
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    function loadData(chartData) {

        let dataAxis = [];
        let data = [];
        for (let ls of chartData) {
            dataAxis.push(ls[0]);
            data.push(ls[1]);
        }
        
        Highcharts.chart('container', {
            chart: {
                type: 'cylinder',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: 'Comparación entre los CPU de AMD'
            },
            xAxis: {
                categories: dataAxis,
                title: {
                    text: 'CPU'
                }
            },
            yAxis: {
                title: {
                    text: 'Precio'
                }
            },
            tooltip: {
                headerFormat: '<b>CPU: {point.x}</b><br>'
            },
            plotOptions: {
                series: {
                    depth: 25,
                    colorByPoint: true
                }
            },
            series: [{
                data: data,
                name: 'Precio',
                showInLegend: false
            }]
        });

    }
</script>

<body style="height: 70vh; padding: 10px;">
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    
</body>

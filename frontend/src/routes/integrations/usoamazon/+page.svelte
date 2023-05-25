<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
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
        
        Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Comparación entre los CPU de AMD'
    },

    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Precio'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Precio: <b>{point.y:.1f} Euros</b>'
    },
    series: [{
        name: 'Population',
        colors: [
            '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
            '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
            '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
            '#03c69b',  '#00f194'
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: chartData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});

    }
</script>

<body style="height: 70vh; padding: 10px;">
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
        </p>
    </figure>
</body>

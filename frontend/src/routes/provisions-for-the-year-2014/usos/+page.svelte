<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Table } from "sveltestrap";
    import axios, { formToJSON } from 'axios';

    onMount(async () => {
        getPokemonData();
    });

    let datosPokemon = [];

    async function getPokemonData() {

        const options = {
        method: 'GET',
        url: 'https://telize-v1.p.rapidapi.com/geoip',
        headers: {
            'X-RapidAPI-Key': 'b270bea616msh4290fc927f6297bp15e5fajsnce54fefbd472',
            'X-RapidAPI-Host': 'telize-v1.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
}
    }

</script>


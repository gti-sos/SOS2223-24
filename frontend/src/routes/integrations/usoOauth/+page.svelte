<script>

import { onMount } from "svelte";

onMount(async () => {
  obtenerToken();
});
  const CLIENT_ID = 'f3da5fd1-4804-41fd-8308-f02616c291ff';
  const CLIENT_SECRET = 'GNh_yuSNr5yow51lzk3Rip5A2Llz-blr1yfNV4vLYSI';

  async function obtenerToken() {
    const response = await fetch('https://accounts.snapchat.com/login/oauth2/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    });

    const data = await response.json();
    const accessToken = data.access_token;
    
    console.log('Token de acceso:', accessToken);
    // Aquí puedes hacer solicitudes a la API de Snapchat utilizando el token de acceso
  }


</script>




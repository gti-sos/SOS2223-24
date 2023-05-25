<script>
    import { Card, CardHeader, CardBody, CardLink, CardTitle, CardSubtitle } from 'sveltestrap';
  </script>
  
  <Card>
    <CardHeader>
      <CardTitle>Integraciones</CardTitle>
    </CardHeader>
    <CardBody>
      <CardLink href="/integrations/withproxy">Integración Con Proxy</CardLink>
      <hr>
      <CardLink href="/integrations/withoutproxy">Integración Sin Proxy</CardLink>
      <hr>
    </CardBody>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Usos</CardTitle>
    </CardHeader>
    <CardBody>
      <CardLink href="/integrations/usoaliexpress">Widget AliExpress</CardLink>
      <hr>
      <CardLink href="/integrations/usohomiciderate">Widget Homicidios</CardLink>
      <hr>
      <CardLink href="/integrations/usocurrency">Widget Monedas</CardLink>
      <hr>
      <CardLink href="/integrations/usoamazon">Widget Amazon</CardLink>
    </CardBody>
  </Card>
  
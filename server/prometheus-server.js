const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = process.env.PORT || 3001;

const promRegister = new promClient.Registry();
promClient.collectDefaultMetrics({ register: promRegister });

const customMetric = new promClient.Gauge({
  name: 'custom_metric_name',
  help: 'Helpful description of the custom metric',
  labelNames: ['label1', 'label2'],
  registers: [promRegister],
});

customMetric.labels('value1', 'value2').set(42);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promRegister.contentType);
  res.end(promRegister.metrics());
});

app.listen(port, () => {
  console.log(`Prometheus server listening on port ${port}`);
});

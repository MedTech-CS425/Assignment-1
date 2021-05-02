var express = require('express');
var app = express();
app.use(express.json());
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})

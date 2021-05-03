const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const authApi = require('./src/apis/authApi');
const authMiddleware = require('./src/middlewares/authMiddleware');
const Error = require('./src/models/responses/error');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect("mongodb://localhost:27017/assignment-1", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', function() {
    console.error("Connection error");
})
mongoose.connection.once('open', function() {
    console.log("Connection to DB established");
})

app.post('/signup', authApi.signUp);

app.post('/login', authApi.login);

app.get('/getUser', authMiddleware.authorize , authApi.getUser);
 
app.use((err, req, res, next) => {
    res.status(500).json(new Error(err.message));
  });

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})

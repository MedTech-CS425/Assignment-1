const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const authApi = require('./src/apis/authApi');
const authMiddleware = require('./src/middlewares/authMiddleware');
const categoriesApi = require('./src/apis/categoriesApi');
const itemsApi = require('./src/apis/itemsApi');
const listsApi = require('./src/apis/listsApi');
const Error = require('./src/models/responses/error');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect("mongodb://localhost:27017/assignment-1", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', function () {
    console.error("Connection error");
})
mongoose.connection.once('open', function () {
    console.log("Connection to DB established");
})

//Auth routes
app.post('/signup', authApi.signUp);

app.post('/login', authApi.login);

app.get('/getUser', authMiddleware.authorize, authApi.getUser);

// Categories routes
app.get('/categories', authMiddleware.authorize, categoriesApi.getCategories);

app.post('/categories', authMiddleware.authorize, categoriesApi.createCategory);

app.put('/categories/:category_id', authMiddleware.authorize, categoriesApi.updateCategory);

app.delete('/categories/:category_id', authMiddleware.authorize, categoriesApi.deleteCategory);

// Items routes
app.get('/items', authMiddleware.authorize, itemsApi.getItems);

app.post('/items', authMiddleware.authorize, itemsApi.createItem);

app.put('/items/:item_id', authMiddleware.authorize, itemsApi.updateItem);

app.delete('/items/:item_id', authMiddleware.authorize, itemsApi.deleteItem);

// Lists routes
app.get('/lists', authMiddleware.authorize, listsApi.getLists);

app.post('/lists', authMiddleware.authorize, listsApi.createList);

app.put('/lists/:list_id', authMiddleware.authorize, listsApi.updateList);

app.delete('/lists/:list_id', authMiddleware.authorize, listsApi.deleteList);

app.get('/lists/:list_id/items', authMiddleware.authorize, listsApi.getListItems);

app.post('/lists/:list_id/items', authMiddleware.authorize, listsApi.addListItem);

app.put('/lists/:list_id/items', authMiddleware.authorize, listsApi.updateListItem);

app.delete('/lists/:list_id/items', authMiddleware.authorize, listsApi.deleteListItem);


app.use((err, req, res, next) => {
    res.status(500).json(new Error(err.message));
});

app.listen(3000, () => {
    console.log("Listening on Port 3000");
})
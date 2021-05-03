const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
id: {
    type: integer
},
name: {
    type: String
},
userId: {   //NAAMLOHA BY REFERENCE??
    type: integer
},
createdAt: {
    type: String
},
updatedAt: {
    type: String
}
});

module.exports('List', ListSchema);
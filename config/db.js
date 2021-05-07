const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true , userUnifiedTopology:true ,})
.then(() => {console.log("DB CONNECTED");})
const db = mongoose.connection
.catch((err) => console.log(err));
const mongoose=require('mongoose');
module.exports=()=>{
const uri=process.env.mongoUri || "mongodb://localhost:27017/assignement1"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false}).catch(err=>console.log(err));

mongoose.connection.on('connected', function () {
  console.log('Database connection established!');
}); 

//to return new document after update 
mongoose.set('returnOriginal', false);

mongoose.connection.on('disconnected', function () { 
  console.log('Database disconnected'); 
});
//safety from crush
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('App terminated... Database connection closed.'); 
    process.exit(0); 
  }); 
}); 

};
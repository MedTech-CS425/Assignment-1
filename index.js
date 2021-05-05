const express = require("express");
const app = express();
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
if (dev) {
  app.use(require("morgan")("dev"));
  console.log("is dev");
}

app.use(express.json());
app.use('/api',require("./routes/auth"));
app.use('/api',require("./routes/list"));
app.use('/api',require("./routes/item"));
app.use('/api',require("./routes/category"));




app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
//init db connection
 require("./db")();
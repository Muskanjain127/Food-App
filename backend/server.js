require("dotenv").config();
const cors = require("cors");
const app = require("./routers/app");
const connectdb = require("./model/connectdb");

connectdb();

app.listen(5000, () => {
  console.log("connected");
});

require("dotenv").config();
const cors = require("cors");
const connectdb = require("./model/connectdb");
connectdb();

const app = require("./routers/app");


app.listen(5000, () => {
  console.log("server runnig successfully");
});

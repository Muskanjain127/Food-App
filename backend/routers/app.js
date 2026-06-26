const express = require("express");
const foodpartner = require("../routers/foodpartnerrouter");
const fooditem = require("../routers/fooditemrouter");
const cors = require("cors");
const app = express();
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.json());

app.use(
  cors({
    origin: ["https://food-app-one-azure.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  }),
);
const userrouter = require("../routers/userrouter");
app.use("/user", userrouter);
app.use("/foodpartner", foodpartner);
app.use("/fooditem", fooditem);

module.exports = app;

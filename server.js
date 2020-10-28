const express = require("express");
const app = express();
const mongoose = require("mongoose");
const algoRouter = require("./routes/cp_routes");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");
const LOCAL = "mongodb://localhost/local-testing-blogify";
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected to database #-#");
});

const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.render("cp/home");
});

app.use("/cp", algoRouter);

app.listen(port, () => {
  console.log(`server listening somewhere on port ${port}`);
});

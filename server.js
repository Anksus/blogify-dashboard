const express = require("express");
const app = express();
const mongoose = require("mongoose");
const algoRouter = require("./routes/cp_routes");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

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

// const student = mongoose.Schema({
//   firstname: String,
// });
// const Student = mongoose.model("Student", student);

// Student.create({ firstname: "ankit" });

app.listen(port, () => {
  console.log(`server listening somewhere on port ${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const itemRouter = require("./routes/ItemRouter");

const app = express();

app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongo DB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected tp mongo DB...");
  })
  .catch((err) => {
    console.log("error in connecting to DB", err);
  });

//Routes
app.use("/items", itemRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at PORT ${port}`);
});

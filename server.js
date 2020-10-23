const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());

//DB config
const db = config.get("mongoURI");
// const db = require('./config/keys').mongoURI;

//Connect to Mongo DB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to mongo DB...");
  })
  .catch((err) => {
    console.log("error in connecting to DB", err);
  });

//CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Routes
app.use("/api/items", require("./routes/items"));
app.use("/api/users", require("./routes/users"));

//Serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at PORT ${port}`);
});

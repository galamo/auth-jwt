const express = require("express");
require("dotenv").config();
const app = express();

const bodyParser = require("body-parser");

const http = require("http");

const cp = require("cookie-parser");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth-router");

mongoose.connect("mongodb://localhost/BankApplication", {
  useNewUrlParser: true
});

var customCors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};
// app.use(cors());
app.use(customCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cp());

app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(409).send(error);
});
const port = process.env.PORT || 3200;
const server = http.createServer(app);

server.listen(port, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listen to port ${port}`);
  }
});

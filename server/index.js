"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

const routes = require("./routes");
require("dotenv").config();

const buildPath = path.join(__dirname, "..", "client/build");
const PORT = 4000;

console.log(buildPath);

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  // .use(express.static("./server/assets"))
  // .use(express.static(path.join(__dirname, "/client/build")))
  .use(express.static(buildPath))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use("/", routes)

  // .get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/build/index.html"));
  // })

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });

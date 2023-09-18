const express = require("express");
const bodyParser = require("body-parser");

class ExpressLoader {
  static init() {
    const app = express();

    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    app.use(express.json());
    return app;
  }
}

module.exports = { ExpressLoader };

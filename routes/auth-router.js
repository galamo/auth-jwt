const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");

router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;
  if (userName && password) {
    let pkContent = fs.readFileSync(__dirname + "/pk.pem");
    let syncToken = jwt.sign(
      { userId: "123456789", userName, password },
      pkContent,
      {
        expiresIn: "10s"
      }
    );
    res.send(syncToken);
    //comment
  }
});

router.post("/verify", (req, res, next) => {
  const token = req.body.token;
  if (token) {
    let pkContent = fs.readFileSync(__dirname + "/pk.pem");
    try {
      let result = jwt.verify(token, pkContent);
      res.json(result);
    } catch (ex) {
      res.json(ex);
    }
  } else {
    res.send("token not found");
  }
});

module.exports = router;

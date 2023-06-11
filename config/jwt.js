const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

router.get("/token", (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (error, data) => {
      if (error) {
        res.status(403).send({ msg: "Token Tidak Valid" });
      } else {
        res.send({ data: data.data });
      }
    });
  } else {
    res.status(401).send({ msg: "Token Kosong" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Explog } = require("../../models/index");

router.get("/", async (req, res) => {
  let data = await Explog.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Explog.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

router.post("/", (req, res) => {
  Explog.create({
    qr: req.body.qr,
    userid: req.body.userid,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    since: req.body.since,
    expired: req.body.expired
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put("/:id", (req, res) => {
  Explog.update(
    {
    qr: req.body.qr,
    userid: req.body.userid,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    since: req.body.since,
    expired: req.body.expired
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((rest) => {
    res.json({
      msg: "success",
      data: rest,
    });
  });
});

router.delete("/:id", (req, res) => {
  Explog.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json({
      msg: "delete succes",
      data: result,
    });
  });
});

module.exports = router;

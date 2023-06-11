const express = require("express");
const router = express.Router();
const { Checkin } = require("../../models/index");

router.get("/", async (req, res) => {
  let data = await Checkin.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Checkin.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

router.post("/", (req, res) => {
  Checkin.create({
    ref: req.body.ref,
    name: req.body.name,
    in: req.body.in,
    out: req.body.out,
    mode: req.body.mode,
    notes: req.body.notes,
    key: req.body.key,
    price: req.body.price
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put("/:id", (req, res) => {
  Checkin.update(
    {
      ref: req.body.ref,
      name: req.body.name,
      in: req.body.in,
      out: req.body.out,
      mode: req.body.mode,
      notes: req.body.notes,
      key: req.body.key,
      price: req.body.price
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
  Checkin.destroy({
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

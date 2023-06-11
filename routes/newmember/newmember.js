const express = require("express");
const router = express.Router();
const { NewMember } = require("../../models/index");

router.get("/", async (req, res) => {
  let data = await NewMember.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await NewMember.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

router.post("/", (req, res) => {
  NewMember.create({
    ref: req.body.ref,
    name: req.body.name,
    in: req.body.in,
    out: req.body.out,
    mode: req.body.mode,
    notes: req.body.notes,
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put("/:id", (req, res) => {
  NewMember.update(
    {
      ref: req.body.ref,
      name: req.body.name,
      in: req.body.in,
      out: req.body.out,
      mode: req.body.mode,
      notes: req.body.notes,
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
  NewMember.destroy({
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

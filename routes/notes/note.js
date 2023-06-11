const express = require("express");
const router = express.Router();
const { Note } = require("../../models/index");

router.get("/", async (req, res) => {
  let note = await Note.findAll();
  res.json({
    data: note,
  });
});

router.get("/:id", async (req, res) => {
  let note = await Note.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: note,
  });
});

router.get("/user/:userId", async (req, res) => {
  let note = await Note.findAll({
    where: {
      userId: req.params.userId,
    },
  });
  res.json({
    data: note,
  });
});

router.post("/", async (req, res) => {
  Note.create({
    userId: req.body.userId,
    staffName: req.body.staffName,
    keterangan: req.body.keterangan,
    catatan: req.body.catatan,
    lastScan: req.body.lastScan,
    visit: req.body.visit,
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put("/:id", (req, res) => {
  Note.update(
    {
      userId: req.body.userId,
      staffName: req.body.staffName,
      keterangan: req.body.keterangan,
      catatan: req.body.catatan,
      lastScan: req.body.lastScan,
      visit: req.body.visit,
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
  Note.destroy({
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

const express = require("express");
const router = express.Router();
const { Role } = require("../../models/index");

router.get("/", async (req, res) => {
  let data = await Role.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Role.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

router.post("/", async (req, res) => {
  Role.create({
    category: req.body.category,
    role: req.body.role,
    description: req.body.description,
    menu: req.body.menu,
    report: req.body.report,
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.patch("/:id", (req, res) => {
  Role.update(
    {
      category: req.body.category,
      role: req.body.role,
      description: req.body.description,
      menu: req.body.menu,
      report: req.body.report,
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
  Role.destroy({
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

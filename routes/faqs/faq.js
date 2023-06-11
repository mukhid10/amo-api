const express = require("express");
const router = express.Router();
const { Faq } = require("../../models/index");

router.get("/", async (req, res) => {
  let faq = await Faq.findAll();
  res.json({
    data: faq,
  });
});

router.get("/:id", async (req, res) => {
  let faq = await Faq.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: faq,
  });
});

router.post("/", async (req, res) => {
  Faq.create({
    category: req.body.category,
    question: req.body.question,
    answer: req.body.answer,
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.patch("/:id", (req, res) => {
  Faq.update(
    {
      category: req.body.category,
      question: req.body.question,
      answer: req.body.answer,
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
  Faq.destroy({
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

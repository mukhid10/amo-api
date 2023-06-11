const express = require("express");
const router = express.Router();
const { Banner } = require("../../models/index");
const randomstring = require("randomstring");

router.get("/", async (req, res) => {
  let data = await Banner.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Banner.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

router.post("/", (req, res) => {
  const randomString = randomstring.generate(5);
  Banner.create({
    name: req.body.name,
    note: req.body.note,
    image: req.files?.image
      ? `https://mobile.amospa.com/asset/banner/` +
        randomString +
        req.files.image.name
      : false,
  }).then((result) => {
    res.json({
      data: result,
    });
  });

  if (req.files?.image) {
    req.files?.image.mv(
      "./asset/banner/" + randomString + req.files?.image?.name,
      (err) => {
        if (err) {
          res.status(500).send({ message: "Error Upload" });
        }
      }
    );
  }
});

router.put("/:id", async (req, res) => {
  const randomString = randomstring.generate(5);

  let data = await Banner.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (req.body?.name || req.body?.note || req.files?.image) {
    Banner.update(
      {
        name: req.body.name,
        note: req.body.note,
        image: req.files?.image
          ? `https://mobile.amospa.com/asset/banner/${randomString}${req.files.image.name}`
          : data[0].image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/banner/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          } else {
            res.json({
              msg: "success",
            });
          }
        }
      );
    }
  } else {
    res.json({
      message: "File not Added",
    });
  }
});

router.delete("/:id", (req, res) => {
  Banner.destroy({
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

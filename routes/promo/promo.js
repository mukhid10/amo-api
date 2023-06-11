const express = require("express");
const router = express.Router();
const { Promo } = require("../../models/index");
const randomstring = require("randomstring");

router.get("/", async (req, res) => {
  let data = await Promo.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Promo.findAll({
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
  if (req.files?.image) {
    Promo.create({
      title: req.body.title,
      price: req.body.price,
      image: req.files?.image
        ? `https://mobile.amospa.com/asset/promo/` +
          randomString +
          req.files?.image?.name
        : false,
      description: req.body.description,
    });

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/promo/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          } else {
            res.json({
              message: "Upload Promo Success",
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

router.put("/:id", async (req, res) => {
  const randomString = randomstring.generate(5);

  let data = await Promo.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (
    req.body?.title ||
    req.body?.price ||
    req.body?.description ||
    req.files?.image
  ) {
    Promo.update(
      {
        title: req.body.title,
        price: req.body.price,
        image: req.files?.image
          ? `https://mobile.amospa.com/asset/promo/` +
            randomString +
            req.files.image.name
          : data[0].image,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/promo/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          } else {
            res.json({
              message: "Update Promo Success",
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
  Promo.destroy({
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

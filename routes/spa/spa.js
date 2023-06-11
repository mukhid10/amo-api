const express = require("express");
const router = express.Router();
const { Spa } = require("../../models/index");
const randomstring = require("randomstring");

router.get("/", async (req, res) => {
  let data = await Spa.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Spa.findAll({
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
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  if (req.files?.pdf && req.files?.picture) {
    Spa.create({
      name: req.body.name,
      pdf: req.files?.pdf
        ? `https://mobile.amospa.com/asset/spa/` +
          randomString +
          req.files.pdf.name
        : false,
      picture: req.files?.picture
        ? `https://mobile.amospa.com/asset/spa/` +
          randomString +
          req.files.picture.name
        : false,
    });

    if (req.files?.pdf) {
      req.files?.pdf.mv(
        "./asset/spa/" + randomString + req.files?.pdf?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }

    if (req.files?.picture) {
      req.files?.picture.mv(
        "./asset/spa/" + randomString + req.files?.picture?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }
    res.json({
      message: "succes upload spa",
    });
  } else {
    res.json({
      message: "File not Added",
    });
  }
});

router.put("/:id", async (req, res) => {
  const randomString = randomstring.generate(5);

  let data = await Spa.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (req.body?.name || req.files?.pdf || req.files?.picture) {
    Spa.update(
      {
        name: req.body.name,
        pdf: req.files?.pdf
          ? `https://mobile.amospa.com/asset/spa/` +
            randomString +
            req.files.pdf.name
          : data.pdf,
        picture: req.files?.picture
          ? `https://mobile.amospa.com/asset/spa/` +
            randomString +
            req.files.picture.name
          : data.picture,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (req.files?.pdf) {
      req.files?.pdf.mv(
        "./asset/spa/" + randomString + req.files?.pdf?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }

    if (req.files?.picture) {
      req.files?.picture.mv(
        "./asset/spa/" + randomString + req.files?.picture?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }
    res.status(200).json({
      message: "success update spa",
    });
  } else {
    res.json({
      message: "File not Added",
    });
  }
});

router.delete("/:id", (req, res) => {
  Spa.destroy({
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

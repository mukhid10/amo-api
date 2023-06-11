const express = require("express");
const router = express.Router();
const { Staffid, Role } = require("../../models/index");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

router.get("/", async (req, res) => {
  let data = await Staffid.findAll({
    attributes: ["id", "name", "phone", "email", "image", "password"],
    include: [
      {
        required: true,
        model: Role,
        attributes: ["id", "role"],
        // where: { dateType: ['REG', 'TMN'] }
      },
    ],
  });
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await Staffid.findAll({
    attributes: ["id", "name", "phone", "email", "image", "password"],
    include: [
      {
        required: true,
        model: Role,
        attributes: ["id", "role"],
      },
    ],
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: data,
  });
});

// REGISTER
router.post("/", async (req, res) => {
  const randomString = randomstring.generate(5);
  if (req.files?.image) {
    const data = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    data.image = req.files?.image
      ? `https://mobile.amospa.com/asset/staff/${randomString}${req.files.image.name}`
      : false;
    let dataEmail = await Staffid.findOne({
      where: {
        email: data.email,
      },
    });
    if (dataEmail?.email) {
      res.json({
        msg: "Email already registered",
      });
    } else {
      Staffid.create(data);
    }

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/staff/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }
    if (req.body.roleId) {
      res.json({
        msg: "Register Staff Success",
      });
    } else {
      res.json({
        msg: "Role not Added",
      });
    }
  } else {
    res.json({
      message: "File not Added",
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Staffid.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "wrong password" });
    if (user && match) {
      jwt.sign({ data: user[0].id }, accessTokenSecret, (err, token) => {
        res.json({ msg: "login Success", token });
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "email does not exist" });
  }
});

router.put("/:id", async (req, res) => {
  const randomString = randomstring.generate(5);

  let data = await Staffid.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (req.body || req.files?.image) {
    if (req.body.password) {      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req?.body?.password, salt);
      req.body.password = hash;
    }
    Staffid.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        roleId: req.body.roleId,
        image: req?.files?.image
          ? `https://mobile.amospa.com/asset/staff/${randomString}${req.files.image.name}`
          : data[0].image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } else {
    res.json({
      message: "File not Added",
    });
  }

  if (req.files?.image) {
    req.files?.image.mv(
      "./asset/staff/" + randomString + req.files?.image?.name,
      (err) => {
        if (err) {
          res.status(500).send({ message: "Error Upload" });
        }
      }
    );
  }

  res.json({
    msg: "Update Staff success",
  });
});

router.delete("/:id", (req, res) => {
  Staffid.destroy({
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

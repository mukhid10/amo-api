const express = require("express");
const router = express.Router();
const { User, Otp } = require("../../models/index");
var id_16 = require("id-16");
const { kirimEmail } = require("../../config/email");
const axios = require("axios");
const schedule = require("node-schedule");
const moment = require("moment");
const randomstring = require("randomstring");

router.get("/", async (req, res) => {
  let data = await User.findAll();
  res.json({
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  let data = await User.findAll({
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
    const randomId = id_16(5);
    const data = req.body;
    data.otp = false;
    data.qr = "AMO~" + randomId;
    data.image = req.files?.image
      ? `https://mobile.amospa.com/asset/user/${randomString}${req.files.image.name}`
      : false;
    data.signatureImage = req.files?.signatureImage
      ? `https://mobile.amospa.com/asset/user/${randomString}${req.files.signatureImage.name}`
      : false;
    let dataEmail = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (dataEmail?.email) {
      res.json({
        msg: "Email already registered",
        rc: "06",
        data: dataEmail,
      });
    } else {
      User.create(data);
    }

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/user/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          } else {
            res.json({
              msg: "Registration successful",
              rc: "00",
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

//LOGIN user
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = (await req.body.password) === user[0].password;

    if (!match)
      return res.status(400).json({ msg: "Wrong password", rc: "06" });
    if (user && match) {
      res.json({ msg: "login Success", rc: "00", data: user });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Your email is not registered yet", rc: "06" });
  }
});

router.put("/:id", async (req, res) => {
  const randomString = randomstring.generate(5);

  console.log(req.body);
  let data = await User.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (req.body || req.files?.image) {
    User.update(
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        since: req.body.since,
        expired: req.body.expired,
        birthday: req.body.birthday,
        image: req.files?.image
          ? `https://mobile.amospa.com/asset/user/${randomString}${req?.files?.image?.name}`
          : data[0]?.image,
        signatureImage: req.files?.signatureImage
          ? `https://mobile.amospa.com/asset/user/${randomString}${req?.files?.signatureImage?.name}`
          : data[0]?.image,
        statusApproval: req?.body?.address?.statusApproval,
        nameApproval: req?.body?.nameApproval,
        address: req?.body?.address,
        password: req?.body?.password,
        active: req?.body?.active,
        gender: req?.body?.gender,
        point: req?.body?.point,
        statusMember: req?.body?.statusMember,
        discount: req?.body?.discount
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (req.files?.image) {
      req.files?.image.mv(
        "./asset/user/" + randomString + req.files?.image?.name,
        (err) => {
          if (err) {
            res.status(500).send({ message: "Error Upload" });
          }
        }
      );
    }

    res.json({
      msg: "Update User success",
    });
  } else {
    res.json({
      message: "File not Added",
    });
  }
});

router.post("/forget", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.json({
      msg: "Email Not Registered",
    });
  } else {
    const templatEmail = {
      from: "AMOSPA",
      to: user.email,
      subject: "AMOSPA Message",
      text: `email: ${user.email} password: ${user.password}`,
    };
    kirimEmail(templatEmail);
    res.json({
      msg: "email and password have been sent to your email",
    });
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json({
      msg: "delete succes",
    });
  });
});

//sceduler delet OTP ya guys
schedule.scheduleJob("*/1 * * * *", async () => {
  let data = await Otp.findAll();
  data.forEach((item) => {
    const waktuSekarang = moment().format();
    const endDate = moment(item.created).add(1, "minute").format();
    const diffTime = moment(endDate).diff(moment(waktuSekarang).format());
    if (diffTime <= 0) {
      axios.delete(`https://mobile.amospa.com/users/otp/${item.id}`);
    }
  });
});

//Urursan OTP Ya Guyss

router.get("/otp/all", async (req, res) => {
  let data = await Otp.findAll();
  res.json({
    data: data,
  });
});

router.post("/otp/send", async (req, res) => {
  let randomCode = Math.floor(1000 + Math.random() * 900000).toString();
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.json({
      msg: "Email Not Registered",
      rc: "06",
    });
  } else {
    const templatEmail = {
      from: "AMOSPA",
      to: user.email,
      subject: "AMOSPA Message OTP",
      text: `Kode OTP anda ${randomCode}`,
    };
    kirimEmail(templatEmail);

    Otp.create({
      code: null,
      confirmationCode: randomCode,
      emailUser: user.email,
      created: moment().format(),
    }).then((result) => {
      res.json({
        msg: "OTP code has been sent to your email",
        rc: "00",
        data: result,
      });
    });
  }
});

//verify register
router.post("/otp/verify", async (req, res) => {
  let code = req.body.code;
  await Otp.findOne({
    where: {
      confirmationCode: code,
    },
  }).then(async (val) => {
    if (!val) {
      res.json({
        msg: "Wrong OTP Code or Expired",
        rc: "06",
      });
    }
    if (val.confirmationCode == code) {
      await User.findOne({
        where: {
          email: val.emailUser,
        },
      }).then((val2) => {
        val2.otp = true;
        val2.save();
        axios.delete(`https://mobile.amospa.com/users/otp/${val.id}`);
        res.json({
          msg: "Activation User Success",
          rc: "00",
        });
      });
    }
  });
});

//Veryfy forget password

router.post("/otp/verify/password", async (req, res) => {
  let code = req.body.code;
  await Otp.findOne({
    where: {
      confirmationCode: code,
    },
  }).then(async (val) => {
    if (!val) {
      res.json({
        msg: "Wrong OTP Code or Expired",
        rc: "06",
      });
    }
    if (val.confirmationCode == code) {
      await User.findOne({
        where: {
          email: val.emailUser,
        },
      }).then((val2) => {
        if (!val2) {
          res.json({
            msg: "Email Not Registered",
            rc: "06",
          });
        } else {
          const templatEmail = {
            from: "AMOSPA",
            to: val2.email,
            subject: "AMOSPA Message Password",
            text: `Password ${val2.password}`,
          };
          kirimEmail(templatEmail);

          axios.delete(`https://mobile.amospa.com/users/otp/${val.id}`);
          res.json({
            msg: "Password has been sent to your email",
            rc: "00",
            data: result,
          });
        }
      });
    }
  });
});

router.delete("/otp/:id", (req, res) => {
  Otp.destroy({
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

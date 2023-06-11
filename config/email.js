const nodemailer = require("nodemailer");

exports.kirimEmail = (dataEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "developersamospa@gmail.com",
      pass: "efmqcvtgavktoryc",
    },
  });
  return transporter
    .sendMail(dataEmail)
    .then((info) => console.log(`email terkirim`))
    .catch((error) => console.log(`terjadi error ${error}`));
};

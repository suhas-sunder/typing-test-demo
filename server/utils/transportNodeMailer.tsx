const nodemailer = require("nodemailer");

//Setup for nodemailer transport
function transportNodeMailer() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "freetypingcamp@gmail.com",
      pass: process.env.NODEMAILERPASSWORD,
    },
  });

  return transporter;
}

module.exports = transportNodeMailer;

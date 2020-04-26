const express = require("express");
const router = express();
const mysqlConnection = require("../connection");
const nodemailer = require("nodemailer");

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  main(user).catch(console.error);
});

// async..await is not allowed in global scope, must use a wrapper
async function main(user) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: "admin@agrobuddy.tk", // generated ethereal user
      pass: "awsnb18865", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "admin@agrobuddy.tk", // sender address
    to: user.uemail, // list of receivers
    subject: "Re: Receiving the inquiry.", // Subject line
    html:
      "Hi " +
      user.uname +
      ", we have received your inquiry.Thank you for contacting us.</br>" +
      "<p>Message Details: </p></br>" +
      "<p>Name: " +
      user.uname +
      "</p></br>" +
      "<p>Email: " +
      user.uemail +
      "</p></br>" +
      "<p>Message: " +
      user.umessage +
      "</p>",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

//inserting a disease
router.post("/contact", async (req, res) => {
  let data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  mysqlConnection.query("INSERT INTO contact SET ?", data, (err, rows) => {
    if (!err) {
      res.send(true);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

// insert data in to cutivated area table
router.post("/area", async (req, res) => {
  let data = {
    userId: req.body.confirmUId,
    plant_name: req.body.confirmPlant,
    cultivated_area: req.body.confirmArea, 
    };

  mysqlConnection.query("INSERT INTO cultivated_area SET ?", data, (err, rows) => {
    if (!err) {
      res.send(true);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

module.exports = router;

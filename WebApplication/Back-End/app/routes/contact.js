const express = require("express");
const router = express();
const mysqlConnection = require("../connection");
const nodemailer = require("nodemailer");

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  main(user).catch(console.error);
});

async function main(user) {
  // Generate test SMTP service account from ethereal.email
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
    from: '"AgroBuddy.tk" <admin@agrobuddy.tk>', // sender address
    to: user.uemail, // mail of receiver
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
}

router.post("/send/email", (req, res) => {
  console.log("request came");
  let user = req.body;
  usermail(user).catch(console.error);
});

async function usermail(user) {
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

  // get all users emails from database
  var emails = "SELECT user_Email FROM user";
  var email_list = [];
  mysqlConnection.query(emails, (err, email, fields) => {
    for (mails in email) {
      email_list.push(email[mails].user_Email);
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AgroBuddy.tk" <admin@agrobuddy.tk>', // sender address
    to: email_list, // list of receivers
    subject: "Re: " + user.subject, // Subject line
    html:
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>Boost </title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><link href=`https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic` rel=`stylesheet` type=`text/css`><link href=`https://fonts.googleapis.com/css?family=Montserrat:400,700` rel=`stylesheet` type=`text/css`><style type="text/css">/* GENERAL STYLE RESETS /.ExternalClass{width: 100%;background-color: #d9d9d9;}body{font-size: 13px;line-height: 1;background-color: #d9d9d9;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;font-family: `Open Sans`, sans-serif;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;/*background-image: url(`images/bg.png`); background-repeat: no-repeat; background-position: center top; opacity: 0.7;/}#bodyTable{height: 100% !important;margin: 0;padding: 0;width: 100% !important;}table{border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-spacing: 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}td, td a{text-decoration: none;}td{font-size: 14px;line-height: 1;padding: 0 !important;}img{border: none;outline: none;text-decoration: none;display: inline-block;height: auto}p{margin: 0;padding: 0;}a:hover, td a:hover{outline: none;}@media only screen and (min-width: 600px){body[yahoo] .left{text-align: left !important;}body[yahoo] .right{text-align: right !important;}}@media only screen and (max-width: 599px){body[yahoo] .wrapper{width: 100% !important;}body[yahoo] .img-resize{width: 100% !important;height:auto !important;}body[yahoo] .text-center{text-align: center !important;}body[yahoo] .hide{display: none !important;}body[yahoo] .spacer1{height: 20px !important;}body[yahoo] .width1{width: 5px !important;}body[yahoo] .align-center{float: none !important;margin: 0 auto !important;}body[yahoo] .max-width{max-width: 300px !important;}body[yahoo] .wrap-width{width: 600px !important;}}@media only screen and (max-width: 479px){body[yahoo] .font-resize1{font-size: 18px !important;}body[yahoo] .font-resize2{font-size: 14px !important;}body[yahoo] .dec-let-space{letter-spacing: 2.5px;}}</style><!--[if (gte mso 9)|(IE)]><style type="text/css">table{border-collapse: collapse;}</style><![endif]--></head><body style="font-size: 14px; background-color: #eceff4;margin: 0; width:100% !important; " yahoo="fix"><table class="wrapper" width="600" border="0" cellspacing="0" cellpadding="0" align="center" ><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tr><td><table cellpadding="0" cellspacing="0" align="center" width="100%"><tr><td background="images/banner.png" style="background-image: url(https://agrobuddy.tk/images/mail/banner.png); background-position: center top; background-repeat: no-repeat; background-size: cover; background-color: #14110f;" valign="top"><!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px; height:550px;"><v:fill type="tile" src="images/banner.png" color="#4d5568"/><v:textbox inset="0,0,0,0"><![endif]--><div><table cellpadding="0" cellspacing="0" border="0" width="100%" ><tr><td width="20"></td><td><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td height="16"></td></tr><tr><td><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="font-size: 0; text-align:center; "><!--[if (gte mso 9)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="328" valign="top"><![endif]--><table style="width:100%; max-width: 328px; display: inline-block" border="0" cellspacing="0" cellpadding="0"><tr><td width="328"><table border="0" cellspacing="0" cellpadding="0" align="left" class="align-center"><tr><td ><img src="https://agrobuddy.tech/assets/images/logo-icon.png"/></td></tr></table></td></tr></table><!--[if (gte mso 9)|(IE)]></td><td width="232" valign="top"><![endif]--><table style="width:100%; max-width: 232px; display:inline-block" border="0" cellspacing="0" cellpadding="0" align="center" class="max-width"><tr></tr><tr><td width="232" class="wrap-width"><table border="0" cellspacing="0" cellpadding="0" align="right" class="align-center" class="wrap-width"><tr><td style="font-size: 14px;color:#ffffff;font-family: `Open Sans`, sans-serif;"><a href="https://agrobuddy.tech/#/" style="font-size: 14px;color:#ffffff; font-weight: 400; font-family: `Open Sans`, sans-serif; text-decoration:none;">Home</a></td><td width="26"></td><td style="font-size: 14px;color:#ffffff;font-family: `Open Sans`, sans-serif;"><a href="https://agrobuddy.tech/#/signup" style="font-size: 14px;color:#ffffff; font-weight: 400; font-family: `Open Sans`, sans-serif; text-decoration:none;">SignUp</a></td><td width="26"></td><td><table border="0" cellspacing="0" cellpadding="0" width="90" align="right"><tr><td width="90" height="28" style="font-size: 14px;color:#ffffff; font-weight: 400; font-family: `Open Sans`, sans-serif; text-decoration:none; background-color:#ff5722;border-radius:2px; text-align:center;"><a href="https://agrobuddy.tech/#/login" style="font-size: 14px;color:#ffffff; font-weight: 400;font-family: font-family: `Montserrat`, sans-serif;text-decoration:none;display:block;line-height: 28px; border-radius:2px; text-align:center; ">Login</a></td></tr></table></td></tr></table></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></table></td></tr><tr><td height="105"></td></tr><tr></tr><tr><td height="14"></td></tr><tr><td class="font-resize1 dec-let-space" style="font-size:20px; color:#ffffff; font-family: `Montserrat`, sans-serif; text-align:center; text-transform: capitalize; letter-spacing: 3.6px;">' +
      user.message +
      '</td></tr><tr><td height="70"></td></tr><tr></tr><tr><td height="64"></td></tr><tr><td align="center" style="text-align:center;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" width="145" align="center"></table></td></tr></table></td></tr><tr><td height="65"></td></tr></table></td><td width="20"></td></tr></table></div><!--[if gte mso 9]></v:textbox></v:rect><![endif]--></td></tr></table></td></tr><tr><td><table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#ffffff;"><tr><td width="20"></td><td><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td height="25"></td></tr><tr><td><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td style="font-size: 0;text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="280" valign="top"><![endif]--><table border="0" align="center" cellspacing="0" cellpadding="0" style="max-width: 280px; width: 100%; display: inline-block; vertical-align: top;"><tr><td class="text-center" width="600" style="font-size: 12px; color: #7f8c8d; font-family: `Montserrat`, sans-serif; text-align:left;">Copyright&#64;2020- AgroBuddy</td></tr><tr><td height="25"></td></tr></table><!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]--><table align="center" border="0" cellspacing="0" cellpadding="0" style="max-width: 280px; width: 100%; display: inline-block; vertical-align: top;"><tr><td width="600" class="text-center" style="font-size: 12px; color: #7f8c8d; font-family: `Montserrat`, sans-serif;text-align:right;">AgroBuddy Auto Mailer</td></tr><tr><td height="25"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></table></td></tr></table></td><td width="20"></td></tr></table></td></tr></table></td></tr></table></body></html>',
  });

  console.log("Message sent: %s", info.messageId);
}

//inserting a contact message
router.post("/contact", async (req, res) => {
  let data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  mysqlConnection.query("INSERT INTO contact SET ?", 
  data, 
  (err, rows) => {
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

  mysqlConnection.query(
    "INSERT INTO cultivated_area SET ?",
    data,
    (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        console.error(err);
        res.send(err);
      }
    }
  );
});

module.exports = router;

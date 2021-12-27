const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
// const fs = require("fs");

const sendEmail = (options) => {
  const { email, subject, verificationUrl } = options;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    logger: true,
    secure: false,
    debug: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    ignoreTLS: true,
  });

  const source = path.join(
    __dirname,
    "../email-views/AdminEmailVerification.handlebars"
  );
  console.log(source);

  transporter.use(
    "compile",
    hbs({
      viewEngine: `express-handlebars`,
      viewPath: `./src/email-views/`,
    })
  );

  const mailOptions = {
    from: `BarterPlex <support@barter.com>`,
    to: email,
    subject,
    template: `AdminEmailVerification`,
    context: { layout: source, email: email, url: verificationUrl },
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("ERROR 💣", err);
    else console.log(`Email sent successfully ${info}`);
  });
};

module.exports = sendEmail;

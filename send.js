// Coded By Fachrel Marpaung
// Sender Node V.0.1
// Beta Tester

const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

// initialize nodemailer
var smtp = [
  // {
  //         host    : "smtp.gmail.com",
  //         port    : "587",
  //         auth    : false,
  //         user    : "*****@gmail.com",
  //         pass    : ""*****@"
  //     }
  {
    host: "smtp.office365.com",
    port: "587",
    auth: false,
    user: "dantomasa@everlasttherapies.com",
    pass: "Mtfckr6969",
    fromname: "Fannie",
  },
];
// Config
send = {
  list: "list.txt",
};
var randomArraySmtp = smtp[Math.floor(Math.random() * smtp.length)];

var transporter = nodemailer.createTransport({
  host: randomArraySmtp.host,
  port: randomArraySmtp.port,
  secure: randomArraySmtp.auth,
  auth: {
    user: randomArraySmtp.user,
    pass: randomArraySmtp.pass,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// Maillist satuan
const maillist = fs.readFileSync(send.list).toString().split("\r\n");
// var maillist = [
//     '****@gmail.com',
// ];

var shortlink = ["https://google.com"];

var randomArrayShortlink =
  shortlink[Math.floor(Math.random() * shortlink.length)];

if (randomArraySmtp.host == "smtp-relay.gmail.com") {
  mailfrom = "example@example.com";
} else {
  mailfrom = randomArraySmtp.user;
}
// console.log(randomArrayShortlink);

//Date
var d = new Date();
var lang = "en",
  year = d.toLocaleString(lang, { year: "numeric" }),
  month = d.toLocaleString(lang, { month: "short" }),
  day = d.toLocaleString(lang, { day: "numeric" }),
  dayName = d.toLocaleString(lang, { weekday: "long" });
var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var datenow = year + "年" + month + "月" + day + "日 " + time + " " + dayName;

transporter.use("compile", hbs(handlebarOptions));

maillist.forEach(async function (to, i, array) {
  setTimeout(function () {
    var mailOptions = {
      //   From mail setting
      from: '"Example" <' + mailfrom + ">",
      //   Subject Setting
      subject: "Example",
      //   priority mail setting
      priority: "middle",
      //   MessageId setting
      messageId:
        "" +
        Math.floor(100000 + Math.random() * 900000) +
        "-321c-4b4e-958b-2fdb4d7f7dff@vmta32.83.lstrk.net",
      encoding: "base64", //quoted-printable'
      textEncoding: "base64",
      template: "example", // the name of the template file i.e email.handlebars
      context: {
        Email: to, // replace {{name}} with Adebola
        Shortlink: randomArrayShortlink,
        Date: datenow,
        RandomCSS: Math.floor(100000 + Math.random() * 900000),
        // company: 'My Company' // replace {{company}} with My Company
      },
    };
    mailOptions.to = to;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("======================================");
      console.log("| Count : " + (i + 1) + "/" + (maillist.length - (i + 1)));
      console.log("| Success sent to: " + mailOptions.to);
      console.log("| Server: " + mailfrom + "(" + randomArraySmtp.host + ")");
      console.log("| messageId : " + mailOptions.messageId);
      console.log("| subject : " + mailOptions.subject);
      console.log("| encoding : " + mailOptions.encoding);
      console.log("| textEncoding : " + mailOptions.textEncoding);
      console.log("| priority : " + mailOptions.priority);
      console.log("======================================");
    });
  }, 10000 * i);
});

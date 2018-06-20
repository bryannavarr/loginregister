const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongo = require("./app/mongodb");
const router = require("./app/routes");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const socialMediaLogins = require("./app/passport");
const https = require("https");
const fs = require("fs");

dotenv.config();
const port = process.env.PORT || 8080;

app.use(cookieParser());

// const httpsOptions = {
//   key: fs.readFileSync("./ssl/localhost.nopass.key"),
//   cert: fs.readFileSync("./ssl/localhost.crt")
// };

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(passport.initialize());
app.use(session({ secret: process.env.EXPRESS_SESSION_KEY }));
socialMediaLogins.facebookLogin();
socialMediaLogins.twitterLogin();
socialMediaLogins.googleLogin();
// socialMediaLogins.instagramLogin();

app.use(router);

app.listen(3050);
console.log("hello");

mongo
  .connect(process.env.MONGODB_URL)
  // .then(initializeServer)
  .then(() => {
    console.log(`${port} Is Active`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// function initializeServer() {
//   if (process.env.HTTPS === "true") {
//     return https.createServer(httpsOptions, app).listen(port);
//   } else {
//     return app.listen(port);
//   }
// }

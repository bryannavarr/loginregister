const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("./app/mongodb");
const routes = require("./app/routes");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(
  bodyParser.urlenccoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Acess-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT , POST, DELETE");
  res.header("withCredentials");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Acccept, Cookie, x-access-token"
  );
  next();
});

app.use(routes);

app.listen(3050);

mongo
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`${port} Is Active`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

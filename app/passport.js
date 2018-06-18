const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const session = require("express-session");
const dotenv = require("dotenv");
const usersService = require("./services/users.service");
const responses = require("./models/responses");

module.exports = {
  facebookLogin: facebookLogin,
  twitterLogin: twitterLogin
};

function facebookLogin() {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/users/auth/facebook/callback",
        profileFields: ["id", "email", "picture"]
      },
      function(accessToken, refreshToken, profile, done) {
        socialMediaLogin(accessToken, refreshToken, profile, done);
      }
    )
  );
}

function twitterLogin() {
  passport.use(
    new TwitterStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/users/auth/twitter/callback",
        profileFields: ["id", "email", "picture"]
      },
      function(accessToken, refreshToken, profile, done) {
        socialMediaLogin(accessToken, refreshToken, profile, done);
      }
    )
  );
}

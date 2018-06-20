const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
const session = require("express-session");
const dotenv = require("dotenv");
const usersService = require("./services/users.service");
const responses = require("./models/responses");

module.exports = {
  facebookLogin: facebookLogin,
  twitterLogin: twitterLogin,
  googleLogin: googleLogin
};

function facebookLogin() {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "https://localhost:8080/api/users/auth/facebook/callback",
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
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "https://localhost:8080/api/users/auth/twitter/callback",
        profileFields: ["id", "email", "picture"]
      },
      function(token, tokeSecret, profile, done) {
        socialMediaLogin(token, tokenSecret, profile, done);
      }
    )
  );
}

function googleLogin() {
  passport.use(
    new GoogleStrategy(
      {
        consumerKey: process.env.GOOGLE_CLIENT_ID,
        consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://localhost:8080/api/users/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
        socialMediaLogin(token, tokenSecret, profile, done);
      }
    )
  );
}

// function instagramLogin() {
//   passport.user(
//     new InstagramStrategy({
//       clientID: process.env.INSTAGRAM_CLIENT_ID,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
//       callbackURL: "https://localhost:8080/api/users/auth/instagram/callback"
//     })
//   );
// }

function socialMediaLogin(token, secondToken, profile, done) {
  usersService.readyByIdSocialMedia(profile).then(userId => {
    if (userId) {
      return done(null, userId);
    }
    if (!userId) {
      let socialMedia = profile.provider;
      const socialMediaUser = {
        [socialMedia]: {
          token: token,
          _id: profile.id
        },
        email: profile.emails[0].value,
        isEmailConfirmed: true,
        createDate: new Date(),
        updateDate: new Date()
      };
      usersService.create(socialMediaUser).then(socialMediaUserId => {
        return done(null, socialMediaUserId);
      });
    }
  });
}

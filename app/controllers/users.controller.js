const dotenv = require("dotenv");
const responses = require("../models/responses");
const usersService = require("../services/users.service");
const apiPrefix = "/api/users";
const authenticate = require("../filters/authenticate");
const crypto = require("crypto");
const mongodb = require("../mongodb");
const ObjectId = mongodb.ObjectId;
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const validateDoc = require("../helpers/validate");
const hasher = require("../helpers/hasher");
const nodemailer = require("nodemailer");
const passport = require("passport");

module.exports = {
  readAll: readAll,
  readAllExt: readAllExt,
  readById: readById,
  create: create,
  login: login,
  update: update,
  delete: _delete,
  register: register,
  logout: logout,
  resetPassword: resetPassword,
  socialMediaLoginCallback: socialMediaLoginCallback
};

function readAllExt(req, rest) {
  usersService
    .readAllExt()
    .then(users => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = users;
      res.json(responseModel);
    })
    .catch(err => {
      console.log("error=", err);
      res.sendStatus(500).send(new responses.ErrorResponse(err));
    });
}

function readById(req, res) {
  usersService
    .readById(req.params.id)
    .then(user => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = user;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse());
    });
}

function register(req, res) {
  req.model.emailKeyExpireDate = new Date(
    new Date().setDate(new Date().getDate() + 1)
  );

  let emailConfirmationKey = crypto.randomBytes(16).toString("hex");
  req.model.email.emailConfirmationKey = emailConfirmationKey;

  usersService.readByEmail(req.model.email).then(data => {
    if (data) {
      res.status(400).send("Email already exists");
    } else {
      const user = { ...req.model };
      const salt = hasher.generateSalt();
      const hashedPw = hasher.hashPassword(salt, req.model.password);
      user.password = hashedPw;
      user.salt = salt;
      usersService
        .register(user)
        .then(id => {
          const responseModel = new responses.ItemResponse();
          responseModel.item = id;
          const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
              user: "zwfvrvo7653f5gzi@ethereal.email",
              pass: "TdYPyN8fdhD1DJvmAy"
            }
          });
          let message = {
            from: "info@edwrd.io",
            to: req.model.email,
            subject: "Please verify your email",
            text:
              "Please copy and paste this address to your browser http://localhost:3000/auth/accountconfirmation/" +
              emailConfirmationKey +
              "This link will expire in 24 hours",
            html:
              '<a href = "http://localhost:3000/auth/accountconfirmation/' +
              '"' +
              ">Click here to verify your email</a><br><p>Verification link will expire in 24 hours.</p>"
          };
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log("Error occured." + err.message);
              return process.exit(1);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          });

          res
            .status(201)
            .location(`${apiPrefix}/register/${id}`)
            .json(responseModel);
        })
        .catch(err => {
          res.status(401).send(new responses.ErrorResponse(err));
          console.log(err);
        });
    }
  });
}

function create(req, res) {
  usersService
    .readByEmail(req.model.email)
    .then(data => {
      if (data) {
        res.status(400).send("Email already exists");
      } else {
        usersService.create(req.model).then(id => {
          const responseModel = new responses.ItemResponse();
          responseModel.item = id;
          res
            .status(201)
            .location(`${apiPrefix}/${id}`)
            .json(responseModel);
        });
      }
    })
    .catch(errr => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function readAll(req, res) {
  usersService
    .readAll()
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        delete user.password;
        delete user.salt;
      }
      const responseModel = new responses.ItemsResponse();
      responseModel.items = users;
      res.json(responseModel);
    })
    .catch(err => {
      console.log("error=", error);
      res.sendStat(500).send(new response.ErrorResponse(err));
    });
}

function login(req, res) {
  usersService
    .login(req.model)
    .then(user => {
      if (!user) {
        res.status(401).send("There was an errror with login");
      } else {
        responseModelItem = "You've Successfully logged in!";
        authenticate.setAuthCookie(req, res, user, responseModelItem);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function socialMediaLoginCallback(req, res, next) {
  let socialMediaName = req.path.split("/");
  passport.authenticate(`${socialMediaName[2]}`, function(err, userId, info) {
    if (err) {
      return next(err);
    }
    if (!userId) {
      res.redirect("http://localhost:3000/auth/login");
    } else {
      let user = { _id: userId };
      authenticate.setAuthCookie(req, res, user);
    }
  })(req, res, next);
}

function update(req, res) {
  usersService
    .update(req.params.id, req.model)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function _delete(req, res) {
  usersService
    .delete(req.params.id)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(new responses.ErrorResponse(err));
    });
}

function logout(req, res) {
  res
    .status(200)
    .clearCookie("auth")
    .clearCookie("hashedUser")
    .send(new responses.SuccessResponse());
}

function resetPassword(req, res) {
  usersService
    .resetPassword(req.model)
    .then(response => {
      const responseModel = new responses.SuccessResponse();
      responseModel.item = response;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse());
    });
}

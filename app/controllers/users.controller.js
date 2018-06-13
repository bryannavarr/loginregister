const dotenv = require("dotenv");
const responses = require("../models/responses");
const usersServer = require("../services/users.service");
const apiPrefix = "/api/users";
const authenticate = require("../filters/authenticate");
const crypto = require("crypto");
const mongodb = require("../mongodb");
const ObjectId = mongodb.ObjectId;
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");
const validateDoc = require("../helpers/validate");
const hasher = require("../helpers/hasher");

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
  resetPassword: resetPassword
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

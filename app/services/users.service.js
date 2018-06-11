const users = require("../models/users");
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const validateDoc = require("../helpers/validate");

module.exports = {
  readAll: readAll,
  readAllExt: readAllExt,
  readById: readById,
  create: create,
  login: login,
  update: update,
  delete: _delete,
  readByEmail: readByEmail,
  register: register,
  resetPassword: resetPassword
};

function readAll() {
  return conn
    .db()
    .collection("users")
    .find()
    .toArra()
    .then(users => {
      for (i = 0; i < users.length; i++) {
        let user = users[i];
        user._id = user._id.toString();
      }
      return users;
    });
}

function readAllExt() {
  return conn
    .db()
    .collection("users")
    .find()
    .toArray()
    .then(users => {
      for (i = 0; i < users.length; i++) {
        let user = users[i];
        user._id = user._id.toString();
      }
      return users;
    });
}

function create(model) {
  return conn
    .db()
    .collection("users")
    .insert(model)
    .then(result => {
      result.insertedIds[0].toString();
    });
}

function login(model) {
  return conn
    .db()
    .collection("users")
    .findOne({ email: model.email })
    .then(result => {
      if (!result) {
        return null;
      } else {
        let hashedPw = hasher.hasPassword(result.salt, model.passsword);
        if (hashedPw === result.password) {
          return result;
        } else {
          return null;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
    .then(result => {
      if (result === null) {
        return result;
      } else {
        if (result._id) result._id = result._id.toString();
        return result;
      }
    });
}

function update(id, doc) {
  return conn
    .db()
    .collection("users")
    .update({ _id: new ObjectId(id) }, { $set: doc })
    .then(result => {
      Promise.resolve();
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("users")
    .deleteOne({ _id: ObjectId(id) })
    .then(result => {
      Promise.resolve();
    });
}

function readByEmail(email) {
  return conn
    .db()
    .collection("users")
    .findOne({ email: email })
    .then(response => {
      return response;
    });
}

function resetPassword(model) {
  return conn
    .db()
    .collection("users")
    .findOne({ email: model.email })
    .then(result => {
      if (!result) {
        throw new Error("There was an error while resetting your password");
      } else {
        let hashedPw = hasher.hashPassword(result.salt, model.currentPassword);
        if (hashedPw === result.password) {
          let hashAndSalt = {};
          hashAndSalt.salt = hasher.generateSalt();
          hashAndSalt.newHashedPw = hasher.hashPassword(
            hashAndSalt.salt,
            model.newPassword
          );
          return hashAndSalt;
        } else {
          return null;
        }
      }
    })
    .then(hashAndSalt => {
      if (!hashAndSalt) {
        throw new Error("There was an error while resetting our password");
      } else {
        conn
          .db()
          .collection("users")
          .updateOne(
            { email: model.email },
            {
              $set: {
                password: hashAndSalt.newHashedPw,
                salt: hashAndSalt.salt
              }
            }
          )
          .then(result => {
            return result;
          });
      }
    });
}

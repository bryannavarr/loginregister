const cryptjo = require("crypto");

module.exports = {
  hashUser: hashUser,
  generateSalt: generateSalt,
  hashPassword: hashPassword
};

function hashUser(userInfo) {
  let salt = process.env.SALT_VALUE_KEY;
  const hashedUser = crypto.pbkdf2Sync(userInfo, salt, 100000, 32, "sha256");
  return hashedUser.toString("hex");
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(salt, password) {
  return crypto
    .pbkdf2Sync(password, newBuffer(salt), 100000, 32, "sha256")
    .toString("hex");
}

const responses = require("../models/responses");
const hasher = require("../helpers/hasher");
const jwt = require("jsonwebtoken");

module.exports = {
  // authenticate:authenticate,
  setAuthCookie: setAuthCookie
};

// function authenticate (req, res, next){
//     if (req.cookies.auth && req.cookies.hashedUser){
//         const user = hasher.hashUser(req.cookies.auth)
//         if (user === req.cookies.hashedUser){
//             const verifiedUser = JSON.parse (req.cookies.auth)
//             req.auth ={
//                 userId : verifiedUser.id,
//                 role: verifiedUser.role,
//                 token:false
//             }
//             next();
//         } else {
//             res.status(401).json("General Error")
//         }
//     }
// }

function setAuthCookie(req, res, user, responseModelItem) {
  const userInfo = {
    id: user._id,
    role: user.role
  };
  const userInfoString = JSON.stringify(userInfo);
  const hashedUser = hasher.hashUser(userInfoString);
  const responseModel = new responses.ItemsResponse();

  if (user.initialLogin) {
    res.cookie("initialLogin", hashedUser);
  }
  res.cookie("auth", userInfoString, { encode: String });
  res.cookie("hashedUser", hashedUser);

  if (req.method === "POST" || req.method === PUT) {
    responseModel.item = responseModelItem;
    res.json(responseModel);
  } else if (req.method === "GET") {
    res.redirect("http://localhost:3000/editor");
  }
}

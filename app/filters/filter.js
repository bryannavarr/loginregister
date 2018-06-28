const usersService = require("../services/users.service");

module.exports = {
  authorizeRoles,
  protectAdminOnlyUserUpdates
};

function authorizeRoles(rolesArray) {
  return (req, res, next) => {
    let currentUserRole = req.auth.role;
    if (rolesArray.includes(currentUserRole)) {
      next();
    } else {
      res.status(401).send("you're not authorized");
    }
  };
}

function protectAdminOnlyUserUpdates(req, res, next) {
  if (
    (req.model.role === "Admin" || req.model.role === "Vendor") &&
    req.auth.role !== "Admin"
  ) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
}

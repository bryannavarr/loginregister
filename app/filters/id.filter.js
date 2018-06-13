module.exports = {
  bodyIdRequired: bodyIdRequired,
  bodyIdDisallowed: bodyIdDisallowed
};

function bodyIdRequired(req, res, next) {
  if (!req.body._id) {
    const idError = "Error: _id property not found";
    console.log(idError);
    res.status(400).send(idError);
    return;
  } else {
    next();
  }
}

function bodyIdDisallowed(req, res, next) {
  if (req.body._id) {
    const idError = "The id can't be in the post payload";
    console.log(idError);
    return res.status(400).send(idError);
  } else {
    next();
  }
}

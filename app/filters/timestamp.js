module.exports = updateDateTimestam;
function updateDateTimestamp(req, res, next) {
  if (req.method === "PUT") {
    if ("updateDate" in req.model) {
      req.model.updateDate = new Date();
      delete req.model.createDate;
    }
  } else {
    res.status(500).send("Timestamp does not support this method");
  }
}

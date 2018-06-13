


const router = require("express").Router();

const clientRoutes = require("./client.routes");
const usersRoutes = require("./users.routes");

module.exports = router;

router.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});

router.use("/api/users", usersRoutes);


useAPIErrorHandlers(router);

router.use(clientRoutes);

function useAPIErrorHandlers(router) {
  router.use("/api/*", (req, res, next) => {
    res.sendStatus(404);
  });

  router.use((err, req, res, next) => {
    if (!err) {
      return next();
    }

    console.error(err.stack);
    res.sendStatus(500);
  });
}

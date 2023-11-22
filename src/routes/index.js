const userRoutes = require('./user')
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "These are Probulon APIs",
      api_health: "good",
      api_version: "V1.0.0",
    });
  });

  app.use("/api/v1/users", userRoutes)
};
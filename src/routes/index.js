const userRoutes = require('./user')
const deviceRoutes = require('./device')
const authRoutes = require('./auth')
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "These are Probulon APIs",
      api_health: "good",
      api_version: "V1.0.0",
    });
  });

  app.use("/api/v1/users", userRoutes)
  app.use("/api/v1/devices", deviceRoutes)
  app.use("/api/v1/auth", authRoutes)
};
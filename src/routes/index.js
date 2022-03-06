const authRoutes = require("./auth.route");
const postRoutes = require("./post.route");
const friendsRoutes = require("./friends.route");
const groupsRoutes = require("./group.route");
const userRoutes = require("./user.route");
const notificationRoute = require("./notification.route");

exports.registerRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/friends", friendsRoutes);
  app.use("/api/groups", groupsRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/notifications", notificationRoute);
};

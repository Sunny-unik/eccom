const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const expressRateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const db = require("./models");
const auth = require("./middlewares/auth");
const userController = require("./controllers/user");
const categoryController = require("./controllers/category");
const serviceController = require("./controllers/service");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(expressRateLimit({ windowMs: 2 * 60 * 1000, limit: 100 }));
app.use(express.json());
app.use(cookieParser());

app.post("/login", userController.login);

app.post("/category", auth, categoryController.createCategory);
app.get("/category", auth, categoryController.getAllCategories);
app.put("/category/:categoryId", auth, categoryController.updateCategory);
app.delete("/category/:categoryId", auth, categoryController.deleteCategory);

app.post("/category/:categoryId/service", auth, serviceController.addService);
app.get(
  "/category/:categoryId/services",
  auth,
  serviceController.getAllServices
);
app.delete(
  "/category/:categoryId/service/:serviceId",
  auth,
  serviceController.removeService
);
app.put(
  "/category/:categoryId/service/:serviceId",
  auth,
  serviceController.updateService
);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server is live on http://localhost:" + port);
  });
});

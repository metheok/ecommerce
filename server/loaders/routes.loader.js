/* Routes */

const userRouter = require("../routes/user.routes");

const authRouter = require("../routes/auth.routes");
const productRouter = require("../routes/product.routes");
const categoryRouter = require("../routes/category.routes");

class RoutesLoader {
  static initRoutes(app) {
    app.use(`/api/auth`, authRouter);
    app.use(`/api/user`, userRouter);
    app.use(`/api/product`, productRouter);
    app.use(`/api/category`, categoryRouter);

    app.use("/", async (req, res) => {
      res.status(404).send("No such route found in the API.");
    });
  }
}

module.exports = { RoutesLoader };

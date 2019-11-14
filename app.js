/**
 * Created by Satish Ameda on 14/11/2019.
 */


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const express = require("express");
const SwaggerExpress = require("swagger-express-mw");
const SwaggerUi = require("swagger-tools/middleware/swagger-ui");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// include api

const login = require("./api/controllers/login");
const thumb = require("./api/controllers/thumbnailGen");
const jsonpatch = require("./api/controllers/jsonpatch");
const auth = require("./api/utils/auth");
// routes
app.use("/api/login", login);
app.use("/api/thumb", auth.authCheck, thumb); // authenticating the router here
app.use("/api/jsonpatch", auth.authCheck, jsonpatch);
app.get("/", (req, res) => {
  res.render("index", {
    title: "Sample Using Swagger by Satish Ameda",
  });
});

if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});

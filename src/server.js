const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const epilogue = require("epilogue");
const OktaJwtVerifier = require("@okta/jwt-verifier");
const BlogModel = require("./models/blog");
const EventModel = require("./models/event");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: "0oaazh0903utVU1He356",
  issuer: "https://dev-349174.okta.com/oauth2/default"
});

let user;
let app = express();
app.use(cors());
app.use(bodyParser.json());

// verify JWT (JSON web token) token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error("Authorization header is required"));
  }
  let parts = req.headers.authorization.trim().split(" ");
  let accessToken = parts.pop();
  oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      };
      user = req.user.email;
      next();
    })
    .catch(next); // jwt did not verify!
});

console.log("user: ", user);


let database = new Sequelize("aIL_web", "bill-a", "BeautifulStruggle!", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Instantiate our models
let Blog = BlogModel(database, Sequelize);
let Event = EventModel(database, Sequelize);

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
});

// Create the dynamic REST resource for our Event model
let eventResource = epilogue.resource({
  model: Event,
  endpoints: ["/events", "/events/:id"]
});

// Create the dynamic REST resource for our Blog model
let blogResource = epilogue.resource({
  model: Blog,
  endpoints: ["/blogs", "/blogs/:id"]
});

// Resets the database and launches the express app on :3001
database.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Event-Blog Server listening to port localhost:3001");
  });
});
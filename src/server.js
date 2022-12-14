import express from "express";
import { routes } from "./routes";
import { initializeDbConnection } from "./db";

const PORT = process.env.PORT || 8080;

const app = express();
var cors = require("cors");

app.options("*", cors()); // include before other routes
// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

process.on("uncaughtException", function (err) {
  console.log(err);
});

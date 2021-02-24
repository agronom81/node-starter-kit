// Modules
const express = require("express");
const path = require("path");

const keys = require("./keys");

//middlewares
const errorHandler = require("./middleware/error");

// Controlers
const homeController = require("./controllers/home");

// Express server
const app = express();

// Server configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", homeController.index);

app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

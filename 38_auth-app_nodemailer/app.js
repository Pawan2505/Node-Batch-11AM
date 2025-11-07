const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
require("./config/db");

const app = express();
const port = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser("secret"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(flash());

// Routes
app.use("/", require("./routes/authRoutes"));

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

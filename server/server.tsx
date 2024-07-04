import { Response } from "express";

const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userAuthRouter");
const accountRouter = require("./routes/accountRouter");
const settingsRouter = require("./routes/settingsRouter");
const imageRouter = require("./routes/imageRouter");
const pgSession = require("connect-pg-simple")(expressSession);
const cors = require("cors");
const helmet = require("helmet"); //Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Best practice.
const { xss } = require("express-xss-sanitizer");
var hpp = require("hpp");

require("dotenv").config({ path: "./config.env" });

const apiVersion = "v1";
const app = express();
const port = process.env.PORT || 3001;

//Set security HTTP headers
app.use(helmet());

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://freetypingcamp.com",
      "https://www.freetypingcamp.com",
      "freetypingcamp.com",
      "www.freetypingcamp.com",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      /* configuration options */
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Cookie parser middleware
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

//Removes duplicate fields from http parameters to prevent HTTP paramater pollution
app.use(hpp());

// Routes
app.use(`/${apiVersion}/api/account`, accountRouter);
app.use(`/${apiVersion}/api/images`, imageRouter);
app.use(`/${apiVersion}/api/user`, userRouter);

// Error handling middleware to be triggered if all of the above routes fail
app.use("*", (err: Error, res: Response) => {
  console.error(err.stack);
  res
    .status(500)
    .send("Server Error: Can't find requested url on this server!");
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

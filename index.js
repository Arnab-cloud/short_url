const PORT = 8002;
// get express and make an express app
const express = require("express");
const app = express();
// to parse cookies
const cookieParser = require("cookie-parser");
// middlewares to check authentication
const {restrictToLoggedUserOnly, checkAuth} = require("./middleware/auth");
// for server side rendering
const path = require("path");

// connect to the mongoDB database
const {connectToMongoDB} = require("./connection");
connectToMongoDB("mongodb://127.0.0.1:27017/");

// get the routers
const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user")

// more middlewares
// for parsing json format
app.use(express.json());
// for parsing cookies
app.use(cookieParser());
// for parsing form data 
app.use(express.urlencoded({extended: false}));

//  setting "ejs" as view engine
app.set("view engine", "ejs");
// setting the views directory
app.set("views", path.resolve("./views"));

// set routes to handle requests
// for url related works
app.use("/url",restrictToLoggedUserOnly,router);
// for user related works(signup/login)
app.use("/user", userRouter);
// for page related works
app.use("/",checkAuth ,staticRouter);

// make the app listen to that port
app.listen(PORT, ()=>console.log(`Server started at http://localhost:${PORT}/login`));
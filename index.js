// require express
const PORT = 8002;
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedUserOnly, checkAuth} = require("./middleware/auth");
// make an express app
// define port
const {connectToMongoDB} = require("./connection");
connectToMongoDB("mongodb://127.0.0.1:27017/");


const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user")

// get routes to handle requests

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedUserOnly,router);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter);

// make the app listen to that port
app.listen(PORT, ()=>console.log(`Server started at http://localhost:${PORT}/login`));
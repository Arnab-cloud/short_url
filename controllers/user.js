const USERS = require("../models/user");
const {setUser} = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    await USERS.create({
        name,
        email,
        password,
    });
    return res.render("login");
};

async function handleUserLogin(req, res){
    const {email,password} = req.body;
    const user = await USERS.findOne({email,password});
    if(!user) return res.render("login", {error: "Invalid username or password"});
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

module.exports={
    handleUserSignUp, handleUserLogin,
};
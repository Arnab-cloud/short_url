const express = require("express");
const router = express.Router();
const URLS = require("../models/url");
const {restrictToLoggedUserOnly} = require("../middleware/auth");

router.get("/",async (req, res)=>{
    if(!req.user) return res.redirect("/login");
    const allUrl = await URLS.find({createdBy: req.user._id});
    return res.render("home", {
        allUrls: allUrl
    });
});
router.get("/signup", (req,res)=>{
    return res.render("signup");
});
router.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports = router;
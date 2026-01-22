const express = require("express");
const router = express.Router();
const passport = require("passport");
const routeController = require("../controllers/user");

router.get("/signup",routeController.signup);

router.post("/signup",routeController.signupPost);

router.get("/login",routeController.login);

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
    }),routeController.loginPost);

router.get("/logout",routeController.logout);

module.exports = router;
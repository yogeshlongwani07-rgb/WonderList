const  User = require("../models/user");


module.exports.signup = (req,res)=>{
    res.render("./signup.ejs");
};

module.exports.signupPost =  async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const ank = await User.register(newUser,password);
        req.login(ank,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User Register Successfully");
        res.redirect("/listings");
        })
    }catch{
        req.flash("error","User is Already Register");
        res.redirect("/signup");
    };
};

module.exports.login = (req,res)=>{
    res.render("login.ejs");
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
};

module.exports.loginPost = async(req,res)=>{
    req.flash("success","You are Logged In!");
    res.redirect("/listings");
};

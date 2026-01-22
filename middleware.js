const reviewSchema = require("./reviewSchema");
const listingSchema1 = require("./Schema");
const ExpressError = require("./utils/ExpressError");

const isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.flash("error","Please Login First!");
        return res.redirect("/login");
    };
    next();
};

const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        console.log(error);
        const exactError = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(exactError,405);
    }else{
        next();
    }
};

const validateListing = (req,res,next)=>{
    const {error} = listingSchema1.validate(req.body);
    console.log(error);
    if(error){
        console.log(error);
        const exactError = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(exactError,405);
    }else{
        next();
    }
};

module.exports = {validateReview,isLoggedIn,validateListing};
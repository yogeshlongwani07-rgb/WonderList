const list = require("../models/listing");
const Reviews = require("../models/reviews");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async(req,res)=>{
    const allListings = await list.find({});
    res.render("index.ejs",{allListings});
};

module.exports.signup = (req,res)=>{
    res.render("./signup.ejs");
};

module.exports.addListing = async(req,res)=>{
    const newList = new list(req.body.listing);
    newList.owner = req.user._id;
    await newList.save();
    req.flash("success","New Listing Created Succussfully");
    res.redirect("/listings");
};

module.exports.newEdit = async(req,res)=>{
    const {id} = req.params;
    await list.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated Succussfully");
    res.redirect(`/listings/${id}`);
};

module.exports.form = (req,res)=>{
    res.render("create.ejs");
};

module.exports.destroy = async(req,res)=>{
    const {id} = req.params;
    await list.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Succussfully");
    res.redirect("/listings");
};

module.exports.edit = async(req,res)=>{
    const {id} = req.params;
    const getId = await list.findById(id);
    if(!getId){
        req.flash("error","Listing You Requested for Does Not Exist");
        res.redirect("/listings");
    }
    res.render("edit.ejs",{getId});
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Reviews.findByIdAndDelete(reviewId);
    await list.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    req.flash("success","Review Deleted Succussfully");
    res.redirect(`/listings/${id}`);
};

module.exports.show = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const listing = await list.findById(id).populate({path:"reviews",populate:{path:"author"}})
        .populate("owner");
        if(!listing){
            req.flash("error","Listing You Requested for, Does Not Exist");
            res.redirect("/listings");
        };
        res.render("show.ejs",{listing});
    }catch{
        next(new ExpressError(`No Listing Found`,777));
    }
};

module.exports.addReview = async(req,res)=>{
    const listing = await list.findById(req.params.id);
    const {comment,rating} = req.body;
    let newReview = new Reviews({
        comment:comment,
        rating:rating,
    });
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    console.log(req.user._id);
    const result = await newReview.save();
    console.log(result);
    await listing.save();
    req.flash("success","New Review Added Succussfully");
    res.redirect(`/listings/${req.params.id}`);
};
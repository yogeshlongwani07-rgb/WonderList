const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/Wrapasync");
const {isLoggedIn,validateReview} = require("../middleware");
const routeController = require("../controllers/listings");

//All listings
router.get("/",AsyncWrap(routeController.index));

//Create listings
router.get("/new",isLoggedIn,routeController.form);

//Delete Listings
router.delete("/:id/delete",isLoggedIn,AsyncWrap(routeController.destroy));

// Edit form
router.get("/:id/edit",isLoggedIn,AsyncWrap(routeController.edit));

//Delete Review
router.delete("/:id/review/:reviewId",isLoggedIn,AsyncWrap(routeController.destroyReview));

//Show listings
router.get("/:id",routeController.show);

//Review
router.post("/:id/review",validateReview,AsyncWrap(routeController.addReview));

module.exports = router;
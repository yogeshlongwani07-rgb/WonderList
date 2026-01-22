const express = require("express");
const router = express.Router({mergeParams:true});
const AsyncWrap = require("../utils/Wrapasync");
const {validateListing} = require("../middleware");
const routeController = require("../controllers/listings");

//Add listing to listings
router.post("/", validateListing , AsyncWrap(routeController.addListing));

router.patch("/:id/edit",AsyncWrap(routeController.newEdit));

module.exports = router;

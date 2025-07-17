const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateSchema
} = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// 🔍 Filter and Search Routes
router.get("/filter/:id", wrapAsync(listingController.filter));
router.get("/search", wrapAsync(listingController.search));

// 📄 Index & Create Listing Routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateSchema,
    wrapAsync(listingController.createListing)
  );

// ➕ New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// 🔁 Show, Update, and Delete Listing Routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateSchema,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

// ✏️ Edit Listing Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

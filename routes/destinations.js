const express = require("express"),
  middleware = require("../middleware"),
  NodeGeocoder = require("node-geocoder"),
  Destination = require("../models/destination");

const router = express.Router();
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};
const {
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinations.js");
const {
  editDestinationPage,
  showDestination,
  getAllDestinationsPage,
  showDestinationPage,
} = require("../controllers/pageRenders");
//INDEX
router.get("/", getAllDestinationsPage);

//NEW DESTINATION
router.get("/new", middleware.isLoggedIn, showDestinationPage);

//CREATE DESTINATION
router.post("/", middleware.isLoggedIn, createDestination);

//SHOW DESTINATION
router.get("/:id", showDestination);

//EDIT DESTINATION
router.get(
  "/:id/edit",
  middleware.checkDestinationOwnership,
  editDestinationPage
);

//UPDATE DESTINATION
router.put("/:id", middleware.checkDestinationOwnership, updateDestination);

//DESTROY DESTINATION
router.delete("/:id", middleware.checkDestinationOwnership, deleteDestination);

module.exports = router;

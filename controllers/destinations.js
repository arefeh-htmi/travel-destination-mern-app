const NodeGeocoder = require("node-geocoder"),
  Destination = require("../models/destination");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

//CREATE DESTINATION
function createDestination(req, res) {
  var newDestination = req.body.destination;
  geocoder.geocode(newDestination.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    newDestination.lat = data[0].latitude;
    newDestination.lng = data[0].longitude;
    Destination.create(newDestination, function (err, createdDestination) {
      if (err) {
        req.flash("error", "Failed to add destination to database");
      } else {
        createdDestination.author.id = req.user._id;
        createdDestination.author.username = req.user.username;
        createdDestination.save();
        res.redirect("/destinations");
      }
    });
  });
}

//UPDATE DESTINATION
function updateDestination(req, res) {
  var editedDestination = req.body.destination;
  geocoder.geocode(editedDestination.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    editedDestination.lat = data[0].latitude;
    editedDestination.lng = data[0].longitude;
    Destination.findByIdAndUpdate(
      req.params.id,
      editedDestination,
      function (err, updatedDestination) {
        if (err) {
          req.flash("error", "Failed to update destination");
          res.redirect("/destinations");
        } else {
          req.flash("success", "Destination updated successfully!");
          res.redirect("/destinations/" + req.params.id);
        }
      }
    );
  });
}

//DESTROY DESTINATION
function deleteDestination(req, res) {
  Destination.findByIdAndRemove(
    req.params.id,
    function (err, deletedDestination) {
      if (err) {
        req.flash("error", "Failed to delete destination");
        res.redirect("/destinations");
      } else {
        req.flash("success", "Destination deleted successfully!");
        res.redirect("/destinations");
      }
    }
  );
}

module.exports = {
  createDestination,
  updateDestination,
  deleteDestination,
};

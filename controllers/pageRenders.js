const User = require("../models/user"),
  Comment = require("../models/comment"),
  Destination = require("../models/destination"),
  passport = require("passport");

// HOME PAGE AND AUTH PAGES AND FUNCTIONS
function registerUser(req, res) {
  //SIGN UP

  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, regUser) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash(
        "success",
        "Registered successfully! Welcome " + req.body.username
      );
      res.redirect("/destinations");
    });
  });
}

function logout(req, res) {
  //LOGOUT
  req.flash("success", "Successfully logged out!");
  req.logOut();
  res.redirect("/destinations");
}
// COMMENTS
function newComment(req, res) {
  //NEW COMMENT page
  Destination.findById(req.params.id, function (err, foundDestination) {
    if (err) {
      req.flash("error", "Destination not found");
    } else {
      res.render("comments/new", { destination: foundDestination });
    }
  });
}
function getCommentToEdit(req, res) {
  //EDIT COMMENT
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      req.flash("error", "Comment not found");
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        destination_id: req.params.id,
        comment: foundComment,
      });
    }
  });
}
// DESTINATIONS
function editDestinationPage(req, res) {
  Destination.findById(req.params.id, function (err, foundDestination) {
    if (err) {
      req.flash("error", "Destination not found");
      res.redirect("/destinations");
    } else {
      res.render("destinations/edit", { destination: foundDestination });
    }
  });
}
function showDestination(req, res) {
  Destination.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundDestination) {
      if (err) {
        req.flash("error", "Failed to view destination");
      } else {
        res.render("destinations/show", { destination: foundDestination });
      }
    });
}
function getAllDestinationsPage(req, res) {
  Destination.find({}, function (err, all_destinations) {
    if (err) {
      req.flash("error", "Failed to retrieve all destinations");
    } else {
      res.render("destinations/index", { destinations: all_destinations });
    }
  });
}
function showDestinationPage(req, res) {
  res.render("destinations/new");
}
module.exports = {
  newComment,
  getCommentToEdit,
  editDestinationPage,
  showDestination,
  getAllDestinationsPage,
  showDestinationPage,
  registerUser,
  logout,
};

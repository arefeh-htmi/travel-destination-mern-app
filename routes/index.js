const express = require("express"),
  passport = require("passport");

const router = express.Router();
const { registerUser, logout } = require("../controllers/pageRenders.js");

//HOME PAGE
router.get("/", function (req, res) {
  res.render("landing");
});

//REGISTERATION FORM
router.get("/register", function (req, res) {
  res.render("register");
});

//SIGN UP
router.post("/register", registerUser);

//LOGIN FORM
router.get("/login", function (req, res) {
  res.render("login");
});

//LOGIN LOGIC
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/destinations",
    failureRedirect: "/login",
    badRequestMessage: "Missing username or password",
    failureFlash: true,
  }),
  function (req, res) {}
);

//LOGOUT
router.get("/logout", logout);

module.exports = router;

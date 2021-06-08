const express = require("express"),
  middleware = require("../middleware"),
  router = express.Router({ mergeParams: true });
const {
  postComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments.js");
const {
  newComment,
  getCommentToEdit,
} = require("../controllers/pageRenders.js");
//NEW COMMENT
router.get("/new", middleware.isLoggedIn, newComment);

//CREATE COMMENT
router.post("/", middleware.isLoggedIn, postComment);

//EDIT COMMENT
router.get(
  "/:comment_id/edit",
  middleware.checkCommentOwnership,
  getCommentToEdit
);

//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, updateComment);

//DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, deleteComment);

module.exports = router;

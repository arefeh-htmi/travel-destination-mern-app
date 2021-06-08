const Destination = require("../models/destination");
const Comment = require("../models/comment");

//CREATE COMMENT
function postComment(req, res) {
  Destination.findById(req.params.id, function (err, foundDestination) {
    if (err) {
      req.flash("error", "Destination not found");
      res.redirect("/destinations");
    } else {
      Comment.create(req.body.comment, function (err, createdComment) {
        if (err) {
          req.flash("error", "Failed to create comment");
        } else {
          createdComment.author.id = req.user._id;
          createdComment.author.username = req.user.username;
          createdComment.save();
          foundDestination.comments.push(createdComment),
            foundDestination.save();
          req.flash("success", "Comment addedd successfully!");
          res.redirect("/destinations/" + req.params.id);
        }
      });
    }
  });
}

//UPDATE COMMENT
function updateComment(req, res) {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    function (err, updatedComment) {
      if (err) {
        req.flash("error", "Failed to update comment");
        res.redirect("back");
      } else {
        req.flash("success", "Comment updated successfully!");
        res.redirect("/destinations/" + req.params.id);
      }
    }
  );
}

//Delete COMMENT

function deleteComment(req, res) {
  Comment.findByIdAndRemove(
    req.params.comment_id,
    function (err, deletedComment) {
      if (err) {
        req.flash("error", "Failed to delete comment");
        res.redirect("back");
      } else {
        req.flash("success", "Comment deleted successfully");
        res.redirect("/destinations/" + req.params.id);
      }
    }
  );
}

module.exports = {
  postComment,
  updateComment,
  deleteComment,
};

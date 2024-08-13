import CommentModel from "./comment.model.js";
import PostModel from "../post/post.model.js";
import PostawayError from "../../suppliments/postawayError.js";

export default class CommentController {
  constructor() {
    console.log(`Comment Controller Activated.`);
  }

  displayCommentByUserId = (request, response, next) => {
    let userId = request.user.userId;
    console.log(`Request to get all the comments by ${userId}`);
    const comments = CommentModel.getCommentsByUserId(userId);
    if (comments.length) {
      response.status(200).send({
        success: true,
        message: `${comments.length} comment(s) by logged in user - ${request.user.userId}~${request.user.userName}`,
        data: comments,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `Logged in user ${request.user.userId}~${request.user.userName} has not commented anything.`,
        data: null,
      });
    }
  };

  displayAllComments = (request, response, next) => {
    console.log(`Request to get all the comments.`);
    const comments = CommentModel.getAllComments();
    response.status(200).send({
      success: true,
      message: `retrieving all comments, successful`,
      data: comments,
    });
  };

  displayCommentById = (request, response, next) => {
    const commentId = request.params.commentId;
    console.log(`Request to display a comment by Id - ${commentId}`);
    const comment = CommentModel.getCommentById(commentId);
    if (comment) {
      response.status(200).send({
        success: true,
        message: `retrieved comment by id - ${commentId}`,
        data: comment,
      });
    } else {
      throw new PostawayError(
        400,
        `Failure in retrieving comment. No Comment found  with id - ${commentId}`
      );
    }
  };

  displayCommentsByPostId = (request, response, next) => {
    const postId = request.params.postId;
    console.log(`request to get all the comments by post id - ${postId}`);
    // validating post id
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new PostawayError(400, `Invalid Post Id - ${postId}`);
    }
    const comments = CommentModel.getCommentsByPostId(postId);
    if (comments.length) {
      response.status(200).send({
        success: true,
        message: `${comments.length} comment(s) on the post - ${postId}`,
        data: comments,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `No one has commented on post - ${postId}`,
        data: null,
      });
    }
  };

  createNewComment = (request, response, next) => {
    const { postId, comment } = request.body;
    const userId = request.user.userId;
    console.log(
      `Comment creation request - ${postId} ~ ${userId} ~ ${comment}`
    );
    // validating post id
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new PostawayError(400, `Invalid Post Id - ${postId}`);
    }
    const commentObj = CommentModel.addComment(userId, postId, comment);
    if (commentObj) {
      response
        .status(201)
        .send({ success: true, message: "comment created.", data: commentObj });
    } else {
      throw new PostawayError(
        400,
        "Sorry, post creation request failed. Try Again!"
      );
    }
  };

  updateComment = (request, response, next) => {
    const { commentId, comment } = request.body;
    const userId = request.user.userId;
    console.log(
      `Comment updation request - ${commentId} ~ ${userId} ~ ${comment}`
    );
    const result = CommentModel.updateComment(commentId, userId, comment);
    if ("error" in result) {
      throw new PostawayError(
        400,
        `Sorry, comment updation request failed. ${result.error}`
      );
    } else {
      response.status(200).send({
        success: true,
        message: "comment updated.",
        data: result["comment"],
      });
    }
  };

  deleteComment = (request, response, next) => {
    console.log(
      `Request to delete a comment by Id - ${request.params.commentId}`
    );
    const loggedUserId = request.user.userId;
    const commentId = request.params.commentId;
    const result = CommentModel.removeComment(commentId, loggedUserId);
    if ("error" in result) {
      throw new PostawayError(
        400,
        `Sorry, comment deletion request failed. ${result.error}`
      );
    } else {
      response.status(200).send({
        success: true,
        message: "Comment Deleted. Below are the deleted Comment details.",
        data: result["comment"],
      });
    }
  };
}

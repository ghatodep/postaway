import LikeModel from "./like.model.js";
import PostModel from "../post/post.model.js";
import PostawayError from "../../suppliments/postawayError.js";

export default class LikeController {
  constructor() {
    console.log("Like Controller Activated.");
  }

  getLikesByUserId = (request, response, next) => {
    console.log(
      `request to get all the likes by logged in user - ${request.user.userId}`
    );
    const likes = LikeModel.getLikesByUserId(request.user.userId);
    if (likes.length) {
      response.status(200).send({
        success: true,
        message: `${likes.length} like(s) by logged in user - ${request.user.userId}~${request.user.userName}`,
        data: likes,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `Logged in user ${request.user.userId}~${request.user.userName} have not liked anything.`,
        data: null,
      });
    }
  };

  getAllLikes = (request, response, next) => {
    console.log(`request to get all the likes`);
    const likes = LikeModel.getAllLikes();
    response.status(200).send({
      success: true,
      message: `retrieving all likes, successful`,
      data: likes,
    });
  };

  getLikesByPostId = (request, response, next) => {
    const postId = request.params.postId;
    console.log(`request to get all the likes by post id - ${postId}`);
    // validating post id
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new PostawayError(400, `Invalid Post Id - ${postId}`);
    }
    const likes = LikeModel.getLikesByPostId(postId);
    if (likes.length) {
      response.status(200).send({
        success: true,
        message: `${likes.length} like(s) on the post - ${postId}`,
        data: likes,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `No one has likes post - ${postId}`,
        data: null,
      });
    }
  };

  toggleLike = (request, response, next) => {
    const postId = request.params.postId;
    const userId = request.user.userId;
    console.log(
      `request to toggle the like on post id - ${postId} by user id - ${userId}`
    );
    // validating post id
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new PostawayError(400, `Invalid Post Id - ${postId}`);
    }
    const result = LikeModel.toggleLike(userId, postId);
    if (result.added) {
      response.status(200).send({
        success: true,
        message: `added like on post - ${request.params.postId}. Like object which was added is shown in data.`,
        data: result.like,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `removed like from post - ${request.params.postId}. Like object which has been removed shown in data.`,
        data: result.like,
      });
    }
  };
}

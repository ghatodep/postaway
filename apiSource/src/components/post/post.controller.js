import PostModel from "./post.model.js";
import PostawayError from "../../suppliments/postawayError.js";

export default class PostController {
  constructor() {
    console.log(`Post Controller activated.`);
  }

  displayUserPosts = (request, response, next) => {
    console.log(
      `Request to display all posts by logged in user\n Logged in User information - ${request.user.userId}~${request.user.userName}`
    );
    const posts = PostModel.getAllPostsByUserId(request.user.userId);
    if (posts.length) {
      response.status(200).send({
        success: true,
        message: `${posts.length} post(s) by logged in user - ${request.user.userId}~${request.user.userName}`,
        data: posts,
      });
    } else {
      response.status(200).send({
        success: true,
        message: `Logged in user ${request.user.userId}~${request.user.userName} have not posted anything.`,
        data: null,
      });
    }
  };

  createNewPost = (request, response, next) => {
    const { caption } = request.body;
    const image = `http://localhost:1298/uploads/${request.file.filename}`;
    console.log(`Post creation request - ${caption} ~ ${image}`);
    const post = PostModel.addPost(caption, request.user.userId, image);
    if (post) {
      response
        .status(201)
        .send({ success: true, message: "post created.", data: post });
    } else {
      throw new PostawayError(
        400,
        "Sorry, post creation request failed. Try Again!"
      );
    }
  };

  displayAllPosts = (request, response, next) => {
    console.log("Request to display all posts.");
    const posts = PostModel.getAllPosts();
    response.status(200).send({
      success: true,
      message: "retrieving all posts successful",
      data: posts,
    });
  };

  displayPostById = (request, response, next) => {
    console.log(`Request to display a post by Id - ${request.params.postId}`);
    const post = PostModel.getPostById(request.params.postId);
    if (post) {
      response.status(200).send({
        success: true,
        message: `retrieved post by id - ${request.params.postId}`,
        data: post,
      });
    } else {
      throw new PostawayError(
        400,
        `Failure in retrieving post. No Post found  with id - ${request.params.postId}`
      );
    }
  };

  updatePost = (request, response, next) => {
    const { postId, caption } = request.body;
    const image = `http://localhost:1298/uploads/${request.file.filename}`;
    console.log(`Post update request - ${postId} ~ ${caption} ~ ${image}`);
    const loggedUserId = request.user.userId;
    const result = PostModel.updatePost(postId, caption, loggedUserId, image);
    if ("error" in result) {
      throw new PostawayError(
        400,
        `Sorry, post updation request failed. ${result.error}`
      );
    } else {
      response.status(200).send({
        success: true,
        message: "post updated.",
        data: result["post"],
      });
    }
  };

  deletePostById = (request, response, next) => {
    console.log(`Request to delete a post by Id - ${request.params.postId}`);
    const loggedUserId = request.user.userId;
    const postId = request.params.postId;
    const result = PostModel.removePost(postId, loggedUserId);
    if ("error" in result) {
      throw new PostawayError(
        400,
        `Sorry, post deletion request failed. ${result.error}`
      );
    } else {
      response.status(200).send({
        success: true,
        message: "Post Deleted. Below are the deleted post details.",
        data: result["post"],
      });
    }
  };
}

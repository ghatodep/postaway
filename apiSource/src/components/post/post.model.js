export default class PostModel {
  constructor(_id, _caption, _userId, _image) {
    this.id = _id ? _id : `POST-${PostModel.idGenerator++}`;
    this.caption = _caption;
    this.userId = _userId;
    this.image = _image;
    console.log(`Post Created - ${this.id}~${this.caption}`);
  }

  static idGenerator = 1;

  static addPost(caption, userId, image) {
    let newPost = new PostModel(null, caption, userId, image);
    postsDb.push(newPost);
    return newPost;
  }

  static getAllPosts() {
    return postsDb;
  }

  static getAllPostsByUserId(userId) {
    return postsDb.filter((post) => {
      return post.userId == userId;
    });
  }

  static getPostById(postId) {
    return postsDb.find((post) => {
      return post.id == postId;
    });
  }

  static updatePost(postId, caption, loggedUserId, image) {
    let postIndex = postsDb.findIndex((post) => {
      return post.id == postId;
    });
    if (postIndex != -1) {
      if (postsDb[postIndex].userId != loggedUserId) {
        return {
          error: `Requested update on post with id '${postId}' is created by another user. Post can only be updated by user who created it.`,
        };
      } else {
        postsDb[postIndex].caption = caption;
        postsDb[postIndex].image = image;
        return { post: postsDb[postIndex] };
      }
    } else {
      return { error: `Invalid post id - ${postId}` };
    }
  }

  static removePost(postId, loggedUserId) {
    let postIndex = postsDb.findIndex((post) => {
      return post.id == postId;
    });
    if (postIndex != -1) {
      if (postsDb[postIndex].userId != loggedUserId) {
        return {
          error: `Requested deletion of post with id '${postId}' is created by another user. Post can only be deleted by user who created it.`,
        };
      } else {
        let postDeleted = postsDb[postIndex];
        postsDb.splice(postIndex, 1);
        return { post: postDeleted };
      }
    } else {
      return { error: `Invalid post id - ${postId}` };
    }
  }
}

let postsDb = [
  new PostModel(null, "my first post", "USER-1", "myImage.png"),
  new PostModel(null, "my second post", "USER-1", "myImage-2.png"),
];

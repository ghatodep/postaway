export default class CommentModel {
  constructor(_id, _userId, _postId, _comment) {
    this.id = _id ? _id : `COMMENT-${CommentModel.idGenerator++}`;
    this.userId = _userId;
    this.postId = _postId;
    this.comment = _comment;
    console.log(`New comment created - ${this.id}~${this.comment}`);
  }

  static idGenerator = 1;

  static getAllComments() {
    return commentsDb;
  }

  static getCommentsByUserId(userId) {
    return commentsDb.filter((comment) => {
      return comment.userId == userId;
    });
  }

  static getCommentsByPostId(postId) {
    return commentsDb.filter((comment) => {
      return comment.postId == postId;
    });
  }

  static getCommentById(commentId) {
    return commentsDb.find((comment) => {
      return comment.id == commentId;
    });
  }

  static addComment(userId, postId, comment) {
    const newComment = new CommentModel(null, userId, postId, comment);
    commentsDb.push(newComment);
    return newComment;
  }

  static updateComment(commentId, loggedUserId, comment) {
    let commentIndex = commentsDb.findIndex((comment) => {
      return comment.id == commentId;
    });
    if (commentIndex != -1) {
      if (commentsDb[commentIndex].userId != loggedUserId) {
        return {
          error: `Requested update on comment with id '${commentId}' is created by another user. Comment can only be updated by user who created it.`,
        };
      } else {
        commentsDb[commentIndex].comment = comment;
        return { comment: commentsDb[commentIndex] };
      }
    } else {
      return { error: `Invalid comment id - ${commentId}` };
    }
  }

  static removeComment(commentId, loggedUserId) {
    let commentIndex = commentsDb.findIndex((comment) => {
      return comment.id == commentId;
    });
    if (commentIndex != -1) {
      if (commentsDb[commentIndex].userId != loggedUserId) {
        return {
          error: `Requested deletion of comment with id '${commentId}' is created by another user. Comment can only be deleted by user who created it.`,
        };
      } else {
        let commentDeleted = commentsDb[commentIndex];
        commentsDb.splice(commentIndex, 1);
        return { comment: commentDeleted };
      }
    } else {
      return { error: `Invalid comment id - ${commentId}` };
    }
  }
}

let commentsDb = [
  new CommentModel(null, "USER-1", "POST-1", "first comment"),
  new CommentModel(null, "USER-1", "POST-2", "second comment"),
  new CommentModel(null, "USER-2", "POST-1", "third comment"),
  new CommentModel(null, "USER-2", "POST-2", "first comment"),
  new CommentModel(null, "USER-1", "POST-1", "first comment - was okay!"),
];

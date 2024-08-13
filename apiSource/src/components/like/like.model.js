export default class LikeModel {
  constructor(_id, _userId, _postId) {
    this.id = _id ? _id : `LIKE-${LikeModel.idGenerator++}`;
    this.userId = _userId;
    this.postId = _postId;
    console.log(`Like Added - ${this.id}~${this.userId}~${this.postId}`);
  }

  static idGenerator = 1;

  static getAllLikes() {
    return likesDb;
  }

  static getLikesByUserId(userId) {
    return likesDb.filter((like) => {
      return like.userId == userId;
    });
  }

  static getLikesByPostId(postId) {
    return likesDb.filter((like) => {
      return like.postId == postId;
    });
  }

  static toggleLike(userId, postId) {
    let likeIndex = likesDb.findIndex((like) => {
      return like.userId == userId && like.postId == postId;
    });
    if (likeIndex == -1) {
      const newLike = new LikeModel(null, userId, postId);
      likesDb.push(newLike);
      return { added: true, like: newLike };
    } else {
      let likeObj = likesDb[likeIndex];
      likesDb.splice(likeIndex, 1);
      return { added: false, like: likeObj };
    }
  }
}

let likesDb = [
  new LikeModel(null, "USER-1", "POST-1"),
  new LikeModel(null, "USER-1", "POST-2"),
  new LikeModel(null, "USER-2", "POST-1"),
  new LikeModel(null, "USER-2", "POST-2"),
];

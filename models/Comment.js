//データは配列に格納する
const comments = [];
let nextId = 1;

//Commentクラスの実装。このクラスのインスタンスが各コメントのデータとなる
class Comment {
  constructor({ username, body }) {
    this.id = nextId++;
    this.username = username;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

//5件分のデータを作成する
for (let i = 0; i < 5; i++) {
  const index = i + 1;
  const comment = new Comment({
    username: `user_${index}`,
    body: `body_${index}`,
  });
  comments.push(comment);
}

//外部に公開するメソッド
module.exports = {
  findAll: () => {
    return comments.slice();
  },
  create: ({ username, body }) => {
    if (!username) {
      throw new Error('usernameは必須です');
    }
    if (!body) {
      throw new Error('bodyは必須です');
    }

    const comment = new Comment({
      username: username,
      body: body,
    });
    comments.push(comment);

    return comment;
  },
  update: ({ id, username, body }) => {
    if (typeof id !== 'number' || id < 1) {
      throw new Error('idは必須です(1以上の数値)');
    }
    if (!username) {
      throw new Error('usernameは必須です');
    }
    if (!body) {
      throw new Error('bodyは必須です');
    }

    const comment = comments.find(comment => id === comment.id);
    if (!comment) {
      throw new Error('idに該当するcommentが存在しません');
    }
    comment.username = username;
    comment.body = body;
    comment.updatedAt = new Date();

    return comment;
  },
  remove: id => {
    if (typeof id !== 'number' || id < 1) {
      throw new Error('idは必須です(1以上の数値)');
    }
    const targetIndex = comments.findIndex(comment => id === comment.id);
    if (targetIndex === -1) {
      throw new Error('idに該当するcommentが存在しません');
    }
    const removedComment = comments.splice(targetIndex, 1)[0];

    return removedComment;
  },
};

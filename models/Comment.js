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
};


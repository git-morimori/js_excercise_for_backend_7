const assert = require('power-assert');
const Comment = require('../../models/Comment');

describe('Comment.findAll()', () => {
  it('Create.findAllで返るデータの内容を確認', () => {
    const comments = Comment.findAll();

    assert.strictEqual(
      Array.isArray(comments),
      true,
      'Comment.findAll()の戻り値は配列である'
    );

    assert.strictEqual(
      comments.length > 0,
      true,
      'Comment.findAll()の戻り値は１件以上のデータを持っている'
    );

    comments.forEach(comment => {
      assert.deepStrictEqual(
        { ...comment },
        {
          id: comment.id,
          username: comment.username,
          body: comment.body,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        }
      );
    });
  });
});

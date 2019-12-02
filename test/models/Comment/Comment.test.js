const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.findAll', () => {
  it('Comment.findAll()の戻り値は配列である', () => {
    assert.strictEqual(Array.isArray(Comment.findAll()), true);
  });

  it('決められたデータ構造でデータが格納されている', () => {
    const comments = Comment.findAll();

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

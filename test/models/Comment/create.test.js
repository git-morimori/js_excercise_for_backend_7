const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.create()', () => {
  it('メソッド実行時引数にusernameプロパティを含むオブジェクトがないとエラーになる', () => {
    try {
      Comment.create({ body: 'body' });
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'usernameは必須です');
    }
  });

  it('メソッド実行時引数にbodyプロパティを含むオブジェクトがないとエラーになる', () => {
    try {
      Comment.create({ username: 'username' });
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'bodyは必須です');
    }
  });

  it('メソッド実行前と実行後で配列commentsの要素数が１件増えていることを確認する', () => {
    const oldComments = Comment.findAll();
    const data = {
      username: 'username',
      body: 'body',
    };

    const createdComment = Comment.create(data);
    assert.deepStrictEqual(
      { ...createdComment },
      {
        id: createdComment.id,
        username: data.username,
        body: data.body,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt,
      }
    );

    const currentComments = Comment.findAll();
    assert.strictEqual(oldComments.length + 1, currentComments.length);
  });
});

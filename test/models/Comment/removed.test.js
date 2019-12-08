const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.remove', () => {
  it('idは１以上の数値でないとエラーになる', () => {
    const invalidDataList = [0, -1, null, {}, [], '1'];
    invalidDataList.forEach(id => {
      try {
        Comment.remove(id);
        assert.fail();
      } catch (error) {
        assert.strictEqual(error.message, 'idは必須です(1以上の数値)');
      }
    });
  });

  it('idに該当するデータが存在しない場合エラーになる', () => {
    const INVALID_ID = 999999999999999;

    try {
      Comment.remove(INVALID_ID);
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'idに該当するcommentが存在しません');
    }
  });

  it('存在するIDを送信したら成功する', () => {
    const oldComments = Comment.findAll();
    const VALID_ID = 2;

    const removedComment = Comment.remove(VALID_ID);
    assert.deepStrictEqual(
      { ...removedComment },
      {
        id: VALID_ID,
        username: removedComment.username,
        body: removedComment.body,
        createdAt: removedComment.createdAt,
        updatedAt: removedComment.updatedAt,
      }
    );

    const currentComments = Comment.findAll();
    assert.strictEqual(
      oldComments.length,
      currentComments.length + 1,
      'Comment.removeメソッドが成功した場合はtodosの件数が1件少なくなっているはず'
    );
  });
});

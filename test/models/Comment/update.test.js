const assert = require('power-assert');
const Comment = require('../../../models/Comment');

describe('Comment.create()', () => {
  it(' メソッド実行時、引数にidプロパティ値(1以上の数値)を含むオブジェクトがないとエラーになる', () => {
    const invalidDataList = [
      {},
      { id: 0 },
      { id: -1 },
      { id: null },
      { id: {} },
      { id: [] },
      { id: '1' },
    ];

    invalidDataList.forEach(data => {
      try {
        Comment.update(data);
        assert.fail();
      } catch (error) {
        assert.strictEqual(error.message, 'idは必須です(1以上の数値)');
      }
    });
  });

  it('メソッド実行時、引数にusernameプロパティを含むオブジェクトがないとエラーになる', () => {
    try {
      Comment.update({
        id: 1,
        body: 'test body',
      });
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'usernameは必須です');
    }
  });

  it('メソッド実行時、引数にbodyプロパティを含むオブジェクトがないとエラーになる', () => {
    try {
      Comment.update({
        id: 1,
        username: 'test username',
      });
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'bodyは必須です');
    }
  });

  it('メソッド実行時、idに紐づくデータがないとエラーになる', () => {
    const notExistedId = 999999999999999;

    try {
      Comment.update({
        id: notExistedId,
        username: 'test username',
        body: 'test body',
      });
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'idに該当するcommentが存在しません');
    }
  });

  it('メソッド実行時、正しい引数を渡すとidに該当するTodoを更新して、更新したTodoを返す', () => {
    const data = {
      id: 1,
      username: 'test username',
      body: 'test body',
    };
    const updatedComment = Comment.update(data);

    assert.deepStrictEqual(
      { ...updatedComment },
      {
        id: data.id,
        username: data.username,
        body: data.body,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt,
      }
    );

    const currentComments = Comment.findAll();
    assert.deepStrictEqual(
      { ...updatedComment },
      { ...currentComments[0] },
      '更新後のデータとupdatedCommentは一致するはず'
    );

    assert.strictEqual(
      updatedComment.updatedAt > updatedComment.createdAt,
      true,
      '更新前と更新後でcreatedAtの時間が変更されている'
    );
  });
});

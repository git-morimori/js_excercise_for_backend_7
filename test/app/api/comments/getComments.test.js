const assert = require('power-assert');
const helper = require('../../../helper/requestHelper');

describe('test GET /api/comments', () => {
  it('レスポンスで返って来るデータのテスト', async () => {
    const response = await helper.request({
      method: 'get',
      endPoint: '/api/comments/',
      statusCode: 200,
    });

    assert.strictEqual(
      Array.isArray(response.body),
      true,
      'レスポンスのbodyには配列のデータが入っている'
    );

    const comments = response.body;

    comments.forEach(comment => {
      assert.strictEqual(typeof comment.id, 'number');
      assert.strictEqual(typeof comment.username, 'string');
      assert.strictEqual(typeof comment.body, 'string');
      assert.strictEqual(typeof comment.createdAt, 'string');
      assert.strictEqual(typeof comment.updatedAt, 'string');
    });
  });
});

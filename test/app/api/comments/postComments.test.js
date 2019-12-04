const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

describe('POST /api/comments', () => {
  const getComments = async () => {
    const response = await requestHelper.request({
      method: 'get',
      endPoint: '/api/comments',
      statusCode: 200,
    });
    return response.body;
  };

  it('usernameを送らなかったら400エラーが返る', async () => {
    const postData = {
      body: 'test body',
    };
    const response = await requestHelper
      .request({
        method: 'post',
        endPoint: '/api/comments',
        statusCode: 400,
      })
      .send(postData);

    assert.deepStrictEqual(
      { ...response.body },
      {
        message: 'usernameは必須です',
      }
    );
  });

  it('bodyを送らなかったら400エラーが返る', async () => {
    const postData = {
      username: 'test username',
    };
    const response = await requestHelper
      .request({
        method: 'post',
        endPoint: '/api/comments',
        statusCode: 400,
      })
      .send(postData);

    assert.deepStrictEqual(
      { ...response.body },
      {
        message: 'bodyは必須です',
      }
    );
  });

  it('username、bodyを送ったら成功する', async () => {
    const oldComments = await getComments();

    const postData = {
      username: 'test username',
      body: 'test body',
    };
    const response = await requestHelper
      .request({
        method: 'post',
        endPoint: '/api/comments',
        statusCode: 200,
      })
      .send(postData);

    const createdComment = response.body;

    assert.deepStrictEqual(
      { ...createdComment },
      {
        id: createdComment.id,
        username: postData.username,
        body: postData.body,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt,
      }
    );

    const currentComments = await getComments();

    assert.strictEqual(
      oldComments.length + 1,
      currentComments.length,
      'コメント作成前と作成後でデータが１件増えていることを確認'
    );
  });
});

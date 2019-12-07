const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

const getComments = async () => {
  const response = await requestHelper.request({
    method: 'get',
    endPoint: '/api/comments',
    statusCode: 200,
  });

  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 99999999999;

describe('PUT /api/comments/:id', () => {
  it('idが不正な場合は400エラーが返る', async () => {
    const putData = {
      username: 'test username',
      body: 'test body',
    };

    const response = await requestHelper
      .request({
        method: 'put',
        endPoint: `/api/comments/${INVALID_ID}`,
        statusCode: 400,
      })
      .send(putData);

    assert.strictEqual(
      response.body.message,
      'idに該当するcommentが存在しません'
    );
  });

  it('usernameを送らなかったら400エラーが返る', async () => {
    const putData = {
      body: 'test body',
    };

    const response = await requestHelper
      .request({
        method: 'put',
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400,
      })
      .send(putData);

    assert.strictEqual(response.body.message, 'usernameは必須です');
  });

  it('bodyを送らなかったら400エラーが返る', async () => {
    const putData = {
      username: 'test username',
    };

    const response = await requestHelper
      .request({
        method: 'put',
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400,
      })
      .send(putData);

    assert.strictEqual(response.body.message, 'bodyは必須です');
  });

  it('不備なくデータを送信したらテストが成功する', async () => {
    const oldComments = await getComments();

    const putData = {
      username: 'test username',
      body: 'test body',
    };

    const response = await requestHelper
      .request({
        method: 'put',
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 200,
      })
      .send(putData);

    const updatedComment = response.body;
    assert.deepStrictEqual(
      { ...updatedComment },
      {
        id: VALID_ID,
        username: putData.username,
        body: putData.body,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt,
      }
    );

    const currentComments = await getComments();
    assert.notDeepStrictEqual(
      { ...oldComments },
      { ...currentComments },
      '更新前と更新後でデータは一致しないはず'
    );
  });
});

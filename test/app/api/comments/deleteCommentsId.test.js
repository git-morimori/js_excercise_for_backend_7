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

describe('DELETE /api/comments/:id', () => {
  it('idが存在しない場合は400エラーが返る', async () => {
    const INVALID_ID = 999999999999999;

    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/comments/${INVALID_ID}`,
      statusCode: 400,
    });
    assert.deepStrictEqual(
      { ...response.body },
      {
        message: 'idに該当するcommentが存在しません',
      }
    );
  });

  it('存在するIDを送信したら成功する', async () => {
    const oldComments = await getComments();
    const VALID_ID = 1;

    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/comments/${VALID_ID}`,
      statusCode: 200,
    });

    const deletedComment = response.body;
    assert.deepStrictEqual(
      { ...deletedComment },
      {
        id: VALID_ID,
        username: deletedComment.username,
        body: deletedComment.body,
        createdAt: deletedComment.createdAt,
        updatedAt: deletedComment.updatedAt,
      }
    );

    const currentComments = await getComments();
    assert.strictEqual(
      oldComments.length,
      currentComments.length + 1,
      '更新前から更新後でデータの件数が減っている'
    );

    assert.deepStrictEqual(
      { ...oldComments[0] },
      { ...deletedComment },
      '削除前の1件目のデータは削除したデータと一致する'
    );

    assert.notDeepStrictEqual(
      { ...currentComments[0] },
      { ...deletedComment },
      '削除後の1件目のデータは削除したデータとは一致しない'
    );
  });
});

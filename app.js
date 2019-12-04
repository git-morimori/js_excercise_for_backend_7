const express = require('express');
const router = require('./routers/comment');
const app = express();

app.use('/api/comments', router);
//json形式で送信されたデータをサーバー内で「req.body」で操作できるようにする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;

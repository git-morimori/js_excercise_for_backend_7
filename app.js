const express = require('express');
const router = require('./routers/comment');
const app = express();

//json形式で送信されたデータをサーバー内で「req.body」で操作できるようにする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//上記の記述の前に以下を記述するとresponseが意図せぬものが返ってくる
app.use('/api/comments', router);

module.exports = app;

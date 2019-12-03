const express = require('express');
const router = require('./routers/comment');
const app = express();

app.use('/api/comments', router);

module.exports = app;

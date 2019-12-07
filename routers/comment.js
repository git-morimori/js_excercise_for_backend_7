const express = require('express');
const controller = require('../controllers/comment');
const router = express.Router();

router
  .route('/')
  .get(controller.getComments)
  .post(controller.postComment);

router
  .route('/:id')
  .put(controller.putComment)
  .delete(controller.deleteComment);

module.exports = router;

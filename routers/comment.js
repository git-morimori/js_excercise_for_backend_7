const express = require('express');
const controller = require('../controllers/comment');
const router = express.Router();

router.route('/').get(controller.getComments);

module.exports = router;

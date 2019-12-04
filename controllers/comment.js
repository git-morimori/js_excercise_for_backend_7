const Comment = require('../models/Comment');

module.exports = {
  getComments: (req, res) => {
    const storedComments = Comment.findAll();
    res.status(200).json(storedComments);
  },
  postComment: () => {},
};

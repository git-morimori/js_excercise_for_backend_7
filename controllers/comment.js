const Comment = require('../models/Comment');

module.exports = {
  getComments: (req, res) => {
    const storedComments = Comment.findAll();
    res.status(200).json(storedComments);
  },
  postComment: (req, res) => {
    try {
      const { username, body } = req.body;
      const createdComment = Comment.create({ username, body });
      res.status(200).json(createdComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  putComment: (req, res) => {
    try {
      const id = req.params.id;
      const { username, body } = req.body;
      const parsedId = parseInt(id, 10);

      const updatedComment = Comment.update({
        id: parsedId,
        username,
        body,
      });
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteComment: () => {},
};

const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Create new comment
router.post('/comment', withAuth, async (req, res) => {
  try {

    const newComment = await Comment.create({
      content: req.body.comment,
      post_id: req.body.postId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id, or no update made!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({ is_deleted: true }, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

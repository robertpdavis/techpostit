const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Homepage
router.get('/', async (req, res) => {
  try {
    const pageTitle = 'Tech Post It!';
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      // Omits posts
      where: {
        is_deleted: false
      },
      order: [
        ['date_created', 'DESC'],
      ]
    });
    
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass page title, serialized data and session flag into template
    res.render('homepage', {
      pageTitle,
      posts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Dashboard for logged in users
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const pageTitle = 'My Dashboard';
    // Get all blogs and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.session.user_id,
        is_deleted: false,
      },
      order: [
        ['date_created', 'DESC'],
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass page title, serialized data and session flag into template
    res.render('dashboard', {
      pageTitle,
      posts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create post page
router.get('/dashboard/create', withAuth, async (req, res) => {
  try {
    const pageTitle = 'Dashboard';
    const option = { "create": true };

    res.render('post', {
      option,
      pageTitle,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//View user post for updating
router.get('/dashboard/view/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.session.user_id
      },
    });
    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        post_id: post.id
      },
      order: [
        ['date_created', 'DESC'],
      ]
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const option = { "view": true };
    const pageTitle = 'Dashboard';

    res.render('post', {
      option,
      post,
      pageTitle,
      comments,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//Get the comment add page for a post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        post_id: post.id
      },
      order: [
        ['date_created', 'DESC'],
      ]
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const pageTitle = 'Tech Post It!';

    res.render('comment', {
      post,
      pageTitle,
      comments,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//User login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const pageTitle = 'Tech Post It!';
  res.render('login', { pageTitle });
});

//User signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const pageTitle = 'Tech Post It!';
  res.render('signup', { pageTitle });
});

module.exports = router;

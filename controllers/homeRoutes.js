const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');


//   using withAuth as Middleware, when withAuth completes it continue (next()), to the function
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,

      // Pass the login flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
  //   if user is already logged in, redirect to homepage
  if (req.session.logged_in) {
    res
    .json({ message: 'Good News! You\'re already logged in! '})
    .redirect('/');
    return;
  };

  res.render('login');
  } catch (err) {
    res.status(400).json(err);
  };
});

// POST user login
router.post('/login', async (req, res) => {
  try {
    // First we find one user record with an email address that matches the one provided by the user logging in
    const userData = await User.findOne({ where: { email: req.body.email } });
    // If an account with that email address doesn't exist, the user will recieve an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // If the user does exist, we will use the checkPassword() instance method to compare the user's input to the password stored in the record
    const validPassword = await userData.checkPassword(req.body.password);
    // If checkPassword() evaluates as false, the user will receive an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // If checkPassword() evaluates as true, the user will be logged in
    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST user logout
router.post('/logout', async (req, res) => {
  try {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res
      .status(204)
      .json({ message: 'You have logged out!' })
      .end();
    });
  } else {
    res
    .status(404)
    .end();
  };

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
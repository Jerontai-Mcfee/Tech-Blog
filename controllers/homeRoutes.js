const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//   using withAuth as Middleware, when withAuth completes it continue (next()), to the function

// retrieves all blogs to display on homepage
router.get('/', async (req, res) => {
  try {
    console.log(">>>>>>>>>  location homeRoutes GET '/' homepage ");
    const blogData = await Blog.findAll({
      attributes: [ "id", "title", "description", "date_created", "user_id"],
      // sort by date descending
      order: [[ "date_created", "DESC" ]],
      // join the user and comments
      include: [
        {
          model: User,
          attributes: ["username"]
          // attributes: { exclude: ['password'] },
        },{
          model: Comment,
          attributes: ["id", "comment_text", "blog_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"]

          }
        }
      ]
    }); 

    // use the .map() array method to create an array of blogs 
    // filter using the .get() method to trim off the extra sequelize object data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // render the homepage
    res.render('homepage', {
      blogs,
      // Pass the login flag to the tamplate
      logged_in: req.session.logged_in,
      logged_username: req.session.logged_user_name,
      logged_user_email: req.session.user_email,
      logged_admin: req.session.user_admin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpage/:id', async (req, res) => {
  try {
    console.log(">>>>>>>>>  location homeRoutes GET '/blogpage/:id' ");
    const blogData = await Blog.findByPk(req.params.id, {
      attributes: [ "id", "title", "description", "date_created", "user_id"],
      // sort by date descending
      order: [[ "date_created", "DESC" ]],
      // join the user and comments
      include: [
        {
          model: User,
          attributes: ["username"]
          // attributes: { exclude: ['password'] },
        },{
          model: Comment,
          attributes: ["id", "comment_text", "blog_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"]

          }
        }
      ]
    });

    // console.log('Before Blog Data', blogData);
    
    const blog = blogData.get({ plain: true });
    console.log('After Blog Data', blog);

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
      logged_username: req.session.logged_user_name,
      logged_user_email: req.session.user_email,
      logged_admin: req.session.user_admin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dash', withAuth, async (req, res) => {
  try {
    console.log(">>>>>>>>>  location homeRoutes GET '/dash' ");
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      // attributes: { exclude: ['password'] },
      attributes: [ "username" ],
      // sort by date descending
      // join the user and comments
      include: [
        {
          model: Blog,
          attributes: [ "id", "title", "description", "date_created", "user_id"],
          // attributes: { exclude: ['password'] },
          order: [[ "date_created", "DESC" ]],
        },{
          model: Comment,
          attributes: ["id", "comment_text", "blog_id", "user_id"],
          include: {
            model: Blog,
            attributes: ["title"]
          }
        }
      ]
    });

    const user = userData.get({ plain: true });

    res.render('dash', {
      ...user,
      logged_in: req.session.logged_in,
      logged_username: req.session.logged_user_name,
      logged_user_email: req.session.user_email,
      logged_admin: req.session.user_admin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// routing to the login/signup page 
router.get('/login', async (req, res) => {
  try {
    console.log(">>>>>>>>>  location homeRoutes GET '/login' ");
    //   if user is already logged in, redirect to homepage
    if (req.session.logged_in) {
      res
        .json({ message: "Good News! You're already logged in! " })
        // redirects to the home page
        .redirect('/');
      return;
    }
    // renders the login/signup page
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST user logout
router.post('/logout', async (req, res) => {
  try {
    console.log("location homeRoutes POST '/logout' ");
    // When the user logs out, destroy the session session
    console.log(req.session);
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).json({ message: 'You have logged out!' }).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
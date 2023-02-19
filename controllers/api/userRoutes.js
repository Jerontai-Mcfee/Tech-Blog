const router = require('express').Router();
const { User } = require('../../models');


// POST (create) user login
router.post('/login', async (req, res) => {
  try {
    console.log(">>>>>>>>>> location userRoutes POST 'api/users/login' ");
    // First we find one user record with an email address that matches the one provided by the user logging in
    // could find on usernames and email addresses (both are required and unique)
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If an account with that email address doesn't exist, the user will recieve an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the user does exist, we will use the checkPassword() instance method to compare the user's input to the password stored in the record
    const validPassword = userData.checkPassword(req.body.password);
    // If checkPassword() evaluates as false, the user will receive an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // save the user in session storage
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.username;
      req.session.user_email = userData.email;
      req.session.user_admin = userData.admin;
      req.session.logged_in = true;
        
      // If checkPassword() evaluates as true, the user will be logged in
      res.json({ user: userData, message: `${req.session.user_name} is now logged in!` });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log("location userRoutes POST 'api/users/signup' ");
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res
        .status(400)
        .json({ message: `User exist. Please try again!` });
      return;
    }

    const newUser = await User.create(req.body);

      req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.user_name = newUser.username;
      req.session.user_email = newUser.email;
      req.session.user_admin = newUser.admin;
      req.session.logged_in = true;
        
      res.json({ user: newUser, message: `Thank you,${req.session.user_name}, for signing up. You are now logged in!` });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
const router = require('express').Router();
const { User } = require('../../models');
// check mini project
router.post('/', async (req, res) => {
  try {
    
    // Find the user who matches the posted e-mail address
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Verify the posted password with the password store in the database
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
// Create session variables buserased on the logged in 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: `${req.session.user_name} is now logged in!` });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {

  if (req.session.logged_in) {
     // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
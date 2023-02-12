const withAuth = (req, res, next) => {
  // This middleware is responsible for: 
  //    authenticating (validating) active session logged in switch 
  // if not logged in, redirects to login page
  //   otherwise will continue to the callback function
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
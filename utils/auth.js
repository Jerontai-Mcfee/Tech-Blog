const withAuth = (req, res, next) => {
    //  created middleware
    //  authenticates (validates) log in information on the route active session
    // if not logged in redirects to login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
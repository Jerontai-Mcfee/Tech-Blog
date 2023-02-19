const logoutHandler = async (event) => {
    try{
      console.log("********** /js/logout.js logoutHandler")
  
      //  POST logout to endpoint to delete the session
      const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // if successful, send the user to the home page
        document.location.replace('/');
        res.json({ message: 'You are now logged out!' });
  
    }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  // event
  $('#logout').on('click', logoutHandler);
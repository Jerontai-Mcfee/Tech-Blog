const loginFormHandler = async (event) => {
    try{
    //  prevent page from loading
    event.preventDefault();
   
    // gather user email and password inputs
    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();
  
    if (email && password) {
      //  get user from database
      // const response = await fetch('/api/users/login', {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        
        // if successful, send the user to the home page
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  const signupFormHandler = async (event) => {
    try { 
   //  prevent page from loading
    event.preventDefault();
   
    // gather user email and password inputs
    const username = $('#name-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const password = $('#password-signup').val().trim();
  
    if (username && email && password) {
      //  get user from database
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // if successful, send the user to the home page
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  } catch (error) {
    res.status(400).json(err);
  }
  };
  
  // event
  $('.login-form').on('submit', loginFormHandler);
  $('.signup-form').on('submit', signupFormHandler);
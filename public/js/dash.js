const createBlogHandler = async (event) => {
    try {
      // prevent page from loading
      event.preventDefault();
  
      // gather user email and password inputs
      const title = $('#blog-title').val().trim();
      const description = $('#blog-desc').val().trim();
  
      if (title && description) {
        // goto end-point to create new blog
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, description }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          window.location.href = '/dash';
        } else {
          res.status(404).json({ message: 'Blog not created!' });
        }
      }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  
  const expandBlogHandler = async (event) => {
    try {
      // prevent page from loading
      event.preventDefault();
  
      // gather user email and password inputs
      const blog_id = $('#single-blog').href('id');
      console.log(blog_id);
  
      if (blog_id) {
        // goto end-point to create new blog
        const response = await fetch(`/blogpage/${blog_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  const deleteBlogHandler = async (event) => {
    console.log("Clicked DELETE Button");
    try {
      // prevent page from loading
      event.preventDefault();
  
      // retrieve the data id from the button
      const delete_id = $('#delete-blog-btn').data('id');
      console.log(delete_id);
  
      if (delete_id) {
        // goto end-point to delete blog
        const response = await fetch(`/api/blogs/${delete_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          window.location.href = '/dash';
        } else {
          res.status(404).json({ message: 'No blog found with this id!' });
        }
      }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  // event
  $('#create-blog-btn').on('click', createBlogHandler);
  $('#delete-blog-btn').on('click', deleteBlogHandler);
  $('#single-blog').on('click', expandBlogHandler);
  
const createCommentHandler = async (event) => {
    try {
      //  prevent page from loading
      event.preventDefault();
      console.log('>>>>>>  entered createCommentHandler');
  
      // gather user email and password inputs
      const comment_text = $('#comment-text').val().trim();
      const blog_id = window.location.pathname.split('/').pop();
  
      if (comment) {
        //  goto end-point to create new blog
  
        console.log(comment_text, blog_id, user_id);
  
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ comment_text, blog_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        
      if (response.ok) {
        // res.status(200).json(blogData);
  
        window.location.href = `/blogpage/${blog_id}`;
      } else {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  const deleteCommentHandler = async (event) => {
    try {
      //  prevent page from loading
      event.preventDefault();
      console.log('>>>>>>>  entered deleteCommentHandler');
      // get blog_id for later
      const blog_id = window.location.pathname.split('/').pop();
  
      // retrieve the data id from the button
      const delete_id = $('#delete-comment-btn').data('id');
      console.log(delete_id);
  
      if (delete_id) {
        //  goto end-point to delete comment
        const response = await fetch('/api/comments/$delete_id', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      if (response.ok) {
        res.status(200).json(blogData);
  
        window.location.href = `/blogpage/${blog_id}`;
      } else {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
    } catch (error) {
      res.status(400).json(err);
    }
  };
  
  $('#create-comment-btn').on('click', createCommentHandler);
  $('#delete-comment-btn').on('click', deleteCommentHandler);
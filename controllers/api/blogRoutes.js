const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);

    // const blog = newBlog.get({ plain: true });
    // res.render('dash', {
    //   ...blog,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});

// :id is the blog identifier
router.delete('/:id', async (req, res) => {
  try {
    console.log(">>>>>>>   location blogRoutes DELETE 'api/blogs/:id' ");
    console.log("Request: " , req.params)
    // by using the combination blog id and user id, we validate the blog belongs to user
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

   res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
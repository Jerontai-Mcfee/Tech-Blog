const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(">>>>>>>   location commentRoutes POST 'api/comments/' ");

    console.log(req.body)
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // res.status(200).json(newComment);
    console.log(newComment);
    const comment = newComment.get({ plain: true });

    console.log(comment);

    res.render('blog', {
      ...comment,
      logged_in: req.session.logged_in,
      logged_username: req.session.logged_user_name,
      logged_user_email: req.session.user_email,
      logged_admin: req.session.user_admin
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// :id is the comment identifier
router.delete('/:id', async (req, res) => {
  try {
    console.log(">>>>>>>   location commentRoutes DELETE 'api/comments/:id' ");
    console.log("Request: " , req.params)
 
    // by using the combination comment id and user id, we validate the comment belongs to user
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

   res.status(200).json(commentData);



  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
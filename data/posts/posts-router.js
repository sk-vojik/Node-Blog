const express = require('express');

const Posts = require('../../data/helpers/postDb');

const router = express.Router();


//GET ALL POSTS

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json({ success: true, posts })
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "We could not retrieve posts at this time."})
    })
});

//GET POST BY ID

router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      if (post) {
        return res.status(200).json({ success: true, post })
      } else {
        res.status(404).json({ success: false, error: "The post with the specified ID could not be found."})
      }
    })
    .catch(error => {
      res.status(500).json({ sucess: false, error: "We could not retrieve this post at this time."})
    })
});


//POST

router.post('/', async (req, res) => {
  if(!req.body.text) {
    return res.status(400).json({ success: false, error: "Please provide text for the post."})
  }
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json({ success: true, post })
  } catch (error) {
    res.status(500).json({ success: false, error: "There was an error while saving the post."})
  }
});

//DELETE

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Posts.remove(req.params.id);
    if (deleted) {
      return res.status(200).json({ success: true, deleted })
    } else {
     res.status(404).json({ success: false, error: "The post with the specified ID does not exist"})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "The post could not be deleted at this time"})
  }
});


//PUT (edit)

router.put('/:id', async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ success: false, error: "Please provide text to update the post with."})
  }
  try {
    const edited = await Posts.update(req.params.id, req.body);
    if (edited) {
      return res.status(200).json({ success: true, edited})
    } else {
      res.status(404).json({ success: false, error: "The post with the specified ID could not be found."})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "We could not update the post at this time."})
  }
});










module.exports = router;
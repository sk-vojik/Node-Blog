const express = require('express');

const db = require('../../data/helpers/postDb');

const router = express.Router();


//GET ALL POSTS

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json({ success: true, posts })
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "We could not retrieve posts at this time."})
    })
});

//GET BY ID

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
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

module.exports = router;
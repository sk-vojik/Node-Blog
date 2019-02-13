const express = require('express');

const db = require('../../data/helpers/postDb');

const router = express.Router();


//GET

router.get('/', async (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json({ success: true, posts })
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "We could not retrieve posts at this time"})
    })
});

module.exports = router;
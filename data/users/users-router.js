const express = require('express');

const Users = require('../../data/helpers/userDb');

const router = express.Router();

//GET ALL USERS

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    if (users) {
      return res.status(200).json({ success: true, users})
    } else {
      res.status(404).json({ success: false, error: "We could not retrieve users at this time."})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "We could not retrieve users at this time."})
  }
});

module.exports = router;
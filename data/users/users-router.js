const express = require('express');

const Users = require('../../data/helpers/userDb');

const router = express.Router();


//capitalize middleware
function capitalize(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}


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


//GET USER BY ID

router.get('/:id', async (req, res) => {
  try {
    const users = await Users.getById(req.params.id);
    if (users) {
      return res.status(200).json({ success: true, users});
    } else {
      res.status(404).json({ success: false, error: "The user with the specified ID does not exist"})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "The user could not be retrieved at this time."})
  }
});


//POST (create user)

router.post('/', capitalize, async (req, res) => {
  if(!req.body.name) {
    return res.status(400).json({ success: false, error: "Please provide a name for the user"})
  } 
  try {
    const user = await Users.insert(req.body);
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, error: "There was an error saving the user."})
  }
});


module.exports = router;
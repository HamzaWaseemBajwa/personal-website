const router = require('express').Router();
require('dotenv').config();
let Profile = require('../models/profile.model');

router.route('/update').post((req, res) => {
    console.log(req.body)
    Profile.findOne()
      .then(profile_data => {
        profile_data.username = req.body.username;
        profile_data.bio = req.body.bio;
        profile_data.link = req.body.link;
  
        profile_data.save()
          .then(() => res.json('Profile data updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
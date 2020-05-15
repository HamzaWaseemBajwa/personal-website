const router = require('express').Router();
let Profile = require('../models/profile.model');

router.route('/').get((req, res) => {
  Profile.findOne()
    .then(profile_data => res.json(profile_data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body);

  const user_name = req.body.name;
  const user_bio = req.body.bio;
  const user_picture_link = req.body.link;

  const newProfile = new Profile({
    username: user_name,
    bio: user_bio,
    link: user_picture_link
  });

  console.log(newProfile);

  newProfile.save()
    .then(() => res.json('Profile added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  username: { type: String, required: true },
  bio: { type: String, required: true },
  link: { type: String, required: true },
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
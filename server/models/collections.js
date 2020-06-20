import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  media: [{
    title: String,
    url: String
  }]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const validEmail = email.includes("@");
        return validEmail;
      },
    },
  },
  playlists: [playlistSchema],
}); 

const user = mongoose.model("user", userSchema);
const playlist = mongoose.model("playlist", playlistSchema);

module.exports = {
  User: user,
  Playlist: playlist
};

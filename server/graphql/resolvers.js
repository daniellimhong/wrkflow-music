import { User, Playlist } from "../models/collections";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

module.exports = {
  registerUser: async ({ userInput }, req, res) => {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Please enter a valid email" });
    }
    if (validator.isEmpty(userInput.password)) {
      errors.push({ message: "Please enter a valid password" });
    }
    if (errors.length > 0) {
      const err = new Error("Invalid input");
      err.data = errors;
      throw err;
    }

    const existingUser = await User.findOne({ username: userInput.username });
    if (existingUser) {
      const err = new Error("Email already exists");
      throw err;
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      username: userInput.username,
      email: userInput.email,
      password: hashedPassword,
    });
    const createdUser = await user.save();

    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
      const err = new Error("User not found");
      err.code = 401;
      throw err;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const err = new Error("Password is inccorrect.");
      err.code = 401;
      throw err;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "secretsecretsecret",
      { expiresIn: "4h" }
    );
    return { token: token, userId: user._id.toString() };
  },
  createPlaylist: async ({playlistInput}, req) => {
    const { playlistName, playlistDescription } = playlistInput;

    // if (!req.isAuth){
    //   const err = new Error('Not authenticated');
    //   err.code = 401;
    //   throw err
    // }

    const errors = [];
    if (validator.isEmpty(playlistInput.playlistName)){
      errors.push({message: 'Please add a playlist name'})
    }
    if (errors.length > 0) {
      const err = new Error("Invalid input");
      err.data = errors;
      throw err;
    }

    // const user = await User.findById(req.userId);
    const user = await User.findById("5eee8d3d5c4f36147c71fd83");
    if (!user) {
      const err = new Error("Invalid User");
      err.code = 401;
      throw err;
    }

    const playlist = new Playlist({
      playlistName,
      playlistDescription
    });
    const createdPlaylist = await playlist.save();
    user.playlists.push(createdPlaylist); // adding playlist to the user's playlists
    return { ...createdPlaylist._doc, _id: createdPlaylist._id.toString(), user: user.username  }

  },


  deletePlaylist: async () => {

  },
  addMedia: async () => {

  },
  deleteMedia: async () => {

  },
  updatePlaylist: async () => {
    // playlist name, description
  }
};

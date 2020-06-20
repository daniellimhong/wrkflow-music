import { User, Playlist } from "../models/collections";
import bcrypt from "bcrypt";

module.exports = {
  registerUser: async ({ userInput }, req, res) => {
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
};

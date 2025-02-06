const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2client } = require("../utils/GoogleConfig.js");
const User = require("../models/User.js");

exports.googleLogin = async (req, res) => {
  const code = req.query.code;

  try {
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      user = await User.create({
        email,
        name,
        profilePicture: picture,
      });
      isNewUser = true;
    }
    const { _id } = user;

    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
      isNewUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong while google login",
    });
  }
};

exports.onBoardUser = async (req, res) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;

    if (!email || !name || !about || !profilePicture) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        about,
        profilePicture,
      });
    }

    user = await User.findByIdAndUpdate(
      user._id,
      {
        email,
        name,
        about,
        profilePicture,
      },
      {
        new: true,
      }
    );

    // Generate a token for the user
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token, // Include the token in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong while onboarding user",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("id email name profilePicture about")
      .sort({ name: 1 });

    const usersGrupedByInitialLetter = {}

    users.forEach(user => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (usersGrupedByInitialLetter[initialLetter]) {
        usersGrupedByInitialLetter[initialLetter].push(user)
      } else {
        usersGrupedByInitialLetter[initialLetter] = [user]
      }
    })
      
    res.status(200).json({
      success: true,
      users: usersGrupedByInitialLetter,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong while getting all users",
    });
  }
};

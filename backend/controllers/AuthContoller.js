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
    res
      .status(500)
      .json({
        success: false,
        error: "Something went wrong while google login",
      });
  }
};

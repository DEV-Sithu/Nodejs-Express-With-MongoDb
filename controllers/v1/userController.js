const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");

module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({
        status: "fail",
        data: { error: "Invalid password" },
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      status: "success",
      data: { token },
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.tokens = user.tokens.concat({ token });
    
    await user.save();
    res.status(201).send({
      status: "success",token,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error },
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};


module.exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({ status: "success", data: { message: "Logged out successfully" } });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};


module.exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ status: "success", data: { message: "Logged out successfully from all devices" } });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};


module.exports.getProfile = async (req, res) => {
  res.status(200).send({ status: "success", data: req.user });
};


module.exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: req.file.path });
    res.status(200).send({ status: "success", data: user });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.deleteAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: null });
    res.status(200).send({ status: "success", data: user });
  }
  catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const isMatch = await req.user.comparePassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(400).send({
        status: "fail",
        data: { error: "Invalid current password" },
      });
    }
    req.user.password = req.body.newPassword;
    await req.user.save();
    res.status(200).send({ status: "success", data: { message: "Password updated successfully" } });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req
      .body.email });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    user.password = req.body.password;
    await user.save();
    res.status(200).send({ status: "success", data: { message: "Password reset successfully" } });

  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const user = await
    User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        data: { error: "User not found" },
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 600000;
    await user.save();
    res.status(200).send({ status: "success", data: { token } });
  }
  catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

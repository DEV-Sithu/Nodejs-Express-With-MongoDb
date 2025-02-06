const User = require("../../models/user.js");

module.exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({
      status: "success",
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

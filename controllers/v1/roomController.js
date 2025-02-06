const Room = require("../../models/room.js");

module.exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send({
      status: "success",
      data: room,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).send({
      status: "success",
      data: rooms,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send();
    }
    res.status(200).send({
      status: "success",
      data: room,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).send({
        status: "fail",
        data: { error: "Room not found" },
      });
    }
    res.status(200).send({
      status: "success",
      data: room,
    });
  } catch (error) {
    res.status(error.status).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send({
        status: "fail",
        data: { error: "Room not found" },
      });
    }
    res.status(200).send({
      status: "success",
      data: room,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

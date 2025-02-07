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

module.exports.deleteRooms = async (req, res) => {
  try {
    await Room.deleteMany({});
    res.status(200).send({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.getRoomFilter = async (req, res) => {
  try {
    console.log(req.query);
   // const room = await Room.find({ roomType: req.query.roomType , roomPrice: req.query.roomPrice});
    const room = await Room.find()
    .where('roomType').equals(req.query.roomType)
    .where('roomPrice').equals(req.query.roomPrice);

    if (!room) {
      return res.status(404).send();
    }
    res.status(200).send({
      status: "success",
      length: room.length,
      data: room,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
};

module.exports.getRoomByDates = async (req, res) => {
  try {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);

    const room = await Room.find({


      $or: [
        { checkInDate: { $gte: fromDate, $lte: toDate } },
        { checkOutDate: { $gte: fromDate, $lte: toDate } },
      ],
    });
    if (!room) {
      return res.status(404).send();
    }
    res.status(200).send({
      status: "success",
      length: room.length,
      data: room,
    });
  }
  catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
}

module.exports.getRoomByPages = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    results.next = {};
    results.previous = {};
    results.total = await Room.countDocuments();
    results.data = await Room.find().skip(startIndex).limit(limit);
    if (endIndex < results.total) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    res.status(200).send({
      status: "success",
      data: results,
    });
  }
  catch (error) {
    res.status(500).send({
      status: "fail",
      data: { error: error.message },
    });
  }
}
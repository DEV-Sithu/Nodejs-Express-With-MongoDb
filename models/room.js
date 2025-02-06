const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomName: {
            type: String,
            trim: true,
            minlength: 3,
            MAX_LENGTH: 20,
            required: [true, "Room Name is required"],
            unique: [true,"Room Already Exists"],
             },
    roomPrice: {
                type: Number,
                required: false
               },
    roomType: {
                type: String,
                required: false
             },
    roomStatus: {
                type: String,
                required: false
               }
});

module.exports = mongoose.model("Room", roomSchema);
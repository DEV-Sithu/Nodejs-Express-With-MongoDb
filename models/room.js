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
                min: [6, 'Must be at least 6, got {VALUE}'],
                max: [15, 'Must be at most 15, got {VALUE}'],
                required: true
               },
    roomType: {
                type: String,
                required: true,
                enum: {
                    values: ['Family', 'Double','Single'],
                    message: '{VALUE} is not supported'
                  }
             },
    roomStatus: {
                type: String,
                required: true,
                default: "available",
                trim: true
               },
     checkInDate: {
                type: Date,
                required: false,
               },
        roomDescription: {
                    type: String,
                    required: false
                },
       roomFacilities: {
                    type: [String],
                    required: false
                },
                     
      },          
);

module.exports = mongoose.model("Room", roomSchema);
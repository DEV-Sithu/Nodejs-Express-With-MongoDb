
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
require('../config/database');

const fs = require('fs');
const Room = require("./../models/room.js");

// Read data from JSON file
const rooms = JSON.parse(fs.readFileSync('./data/guesthouse.rooms.json','utf-8'));

// Delete existing rooms from collection
const deleteRoom = async (req, res) => {
    try {
        await Room.deleteMany({});
        console.log('Rooms deleted successfully');
    } catch (error) {
        console.log('Error deleting rooms',error.message);
    }
    process.exit();
  }

 // Import rooms data to mongodb 
  const importRooms = async () => {
    try {
        await Room.insertMany(rooms);
        console.log('Rooms imported successfully');
    } catch (error) {
        console.log('Error importing rooms', error.message);
    }
    process.exit();
  }

  deleteRoom();
  importRooms();
  

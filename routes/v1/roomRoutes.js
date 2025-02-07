const router = require('express').Router();
const roomController = require('../../controllers/v1/roomController.js');


router.post('/rooms', roomController.createRoom)
      .get('/rooms', roomController.getRooms)
      .get('/rooms/:id', roomController.getRoom)
      .put('/rooms/:id', roomController.updateRoom)
      .delete('/rooms/:id', roomController.deleteRoom)
      .get('/rooms/filter',roomController.getRoomFilter);

module.exports = router;
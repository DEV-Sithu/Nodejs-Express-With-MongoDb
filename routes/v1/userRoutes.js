const router = require('express').Router();
const userController = require('../../controllers/v1/userController.js');

router.post('/users', userController.createUser)
      .get('/users', userController.getAllUsers)
      .get('/users/:id', userController.getUserById)
      .put('/users/:id', userController.updateUser)
      .delete('/users/:id', userController.deleteUser);

module.exports = router;
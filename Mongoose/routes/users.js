const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getAllUsers);
router.get('/:idUser', userController.getById);
router.post('/', userController.addUser);
router.delete('/:idUser', userController.deleteUser);
router.patch('/:idUser', userController.updateUser);

module.exports = router;

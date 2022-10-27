import express from 'express';

import userController from '../controllers/user-controller';
import ValidationUserPost from '../validation/user-post-validation';
import ValidatorLogin from '../validation/login-validarion';
import authController from '../controllers/auth-controller';
import { Auth } from '../middleware/auth-middleware';

const router = express.Router();

router.post('/login', ValidatorLogin, authController.login);

router.get('/users', Auth(), userController.getUsers);
router.get('/user/:email', Auth(), userController.getUser);
router.post('/user', Auth(), ValidationUserPost, userController.createUser);
// router.patch('/user', Auth('g'), ValidationUserEdit, userController.updateUser);
// router.delete('/user/:id', Auth('g'), userController.deleteUser);

export default router;

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {createUser,updateUser, deleteUser, login} = require ('../controllers/userController.js');

const signupValidator = [
    check('username').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];
const loginValidator = [
    check('username').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];
router.post('/user/signup',signupValidator,createUser);
router.post('/user/login',loginValidator,login)
router.put('/user/updateuser/:id', updateUser);
router.delete('/user/deleteuser/:id',deleteUser);

module.exports = router




const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {createUser,updateUser, deleteUser, login} = require ('../controllers/userController.js');

const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];
const loginValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];
router.post('/api/signup',signupValidator,createUser);
router.post('/api/login',loginValidator,login)
router.put('/api/updateuser/:id', updateUser);
router.delete('/api/deleteuser/:id',deleteUser);

module.exports = router




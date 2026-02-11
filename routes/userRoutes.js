const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {createUser,updateUser, deleteUser} = require ('../controllers/userController.js');

const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];

router.post('/api/signup',createUser);
router.put('/api/updateuser/:id', updateUser);
router.delete('/api/deleteuser/:id',deleteUser)

module.exports = router




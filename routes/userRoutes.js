const express = require('express');
const router = express.Router();

const {createUser,updateUser, deleteUser} = require ('../controllers/userController.js');

router.post('/api/createuser', createUser);
router.put('/api/updateuser/:id', updateUser);
router.delete('/api/deleteuser/:id',deleteUser)

module.exports = router




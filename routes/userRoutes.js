const express = require('express');
const router = express.Router();

const {createUser,updateUser} = require ('../controllers/userController.js');

router.post('/api/createuser', createUser);
router.put('/api/updateuser/:id', updateUser);

module.exports = router




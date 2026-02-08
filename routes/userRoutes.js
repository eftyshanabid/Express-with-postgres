const express = require('express');
const router = express.Router();

const {createUser} = require ('../controllers/userController.js');

router.post('/api/createuser', createUser);

module.exports = router




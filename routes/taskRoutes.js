const express = require('express');
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById
} = require('../controllers/taskController.js');


router.get('/api/health', (req, res) => {
  const msg = 'ok';
  const timer = process.uptime().toString();
  res.json({ message: msg, uptime: timer });
});

router.post('/api/createtask', createTask);

router.put('/api/tasks/:id', updateTask);

router.delete('/api/tasks/:id', deleteTask);



router.get('/api/gettasks',getAllTasks);


router.get('/api/gettask/:id',getTaskById);

module.exports = router;
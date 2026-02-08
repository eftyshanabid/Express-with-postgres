const Task = require("../models/Task");

async function createTask(req,res){
    try {
        const { title, description } = req.body;
        
        const newTask = await Task.create({ title, description });
        
        res.status(200).json({
          message: 'Task created successfully',
          task: newTask
        });
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  async function updateTask(req, res) {
  try {
    const {id} = req.params;
    const {title, description } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found',
        message: `Task with ID ${id} does not exist` 
      });
    }

    await task.destroy();

    res.status(200).json({
      message: 'Task deleted successfully',
      deletedTask: {
        id: task.id,
        title: task.title
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete task',
      details: error.message 
    });
  }
}


const getAllTasks = async (req,res) => {
  try {
    const tasks = await Task.findAll();
    // console.log(tasks);
    res.status(200).json({
      tasks : tasks
    })
    // return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId); 

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById
};
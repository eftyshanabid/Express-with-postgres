const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define('Task',{
    title:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false }
})

Task.sync()
  .then(() => console.log('Task table created successfully.'))
  .catch((error) => console.error('Error creating table:', error));

module.exports = Task;
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


module.exports = Task;
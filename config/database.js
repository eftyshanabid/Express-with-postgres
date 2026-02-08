const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/efty')

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Task = sequelize.define('Task',{
    title:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false }
});

Task.sync()
  .then(() => console.log('Task table created successfully.'))
  .catch((error) => console.error('Error creating table:', error));

exports.Task = Task;

const User = sequelize.define('User',{
    username:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    roll:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    }
})











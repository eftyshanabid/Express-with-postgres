const Sequelize = require('sequelize');
const sequelize = require('../config/database')

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

User.sync()
.then(()=>{
    console.log("user table has been created");
}).catch((err)=>{
    console.log("unable to connect to the database",err);
})

module.exports = User
 
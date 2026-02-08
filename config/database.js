const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/efty')

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;











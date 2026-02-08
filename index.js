const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/v1', taskRoutes);

const _port = Number(process.env.PORT);

if (isNaN(_port)) {
  console.error('invalid port number');
} else {
  const server = app.listen(_port, () => {
    console.log(`app is listening to port: ${_port}`);
  });
}

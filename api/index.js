import dotenv from 'dotenv';
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import Route
const userRoutes = require('./routes/UserRoute.js');

const app = express();
const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.error('Connection Error: ', err));

app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running`);
});

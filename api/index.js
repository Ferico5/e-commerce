const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import Route
const userRoutes = require('./routes/UserRoute.js');
const productRoutes = require('./routes/ProductRoute.js');
const cartRoutes = require('./routes/CartRoute.js');
const orderRoutes = require('./routes/OrderRoute.js');

const app = express();
const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

console.log('MongoDB URL:', process.env.MONGODB_URL);

mongoose
  .connect(mongoDBURL)
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.error('Connection Error: ', err));

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running`);
});

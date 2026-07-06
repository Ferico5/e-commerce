const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

// import routes
const userRoutes = require("./routes/UserRoute.js");
const productRoutes = require("./routes/ProductRoute.js");
const cartRoutes = require("./routes/CartRoute.js");
const orderRoutes = require("./routes/OrderRoute.js");

const app = express();

// Security & performance middlewares
app.use(helmet());
app.use(compression());

// Rate limiter (100 req / 15 menit per IP) - dilewati saat testing
if (process.env.NODE_ENV !== "test") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

// Body parser
app.use(express.json());

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Routes
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

// Error handler (global)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;
  res.status(status).json({ success: false, message });
});

module.exports = app;

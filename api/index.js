const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.set("strictQuery", true);
const mongoDBURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error: ", err));

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

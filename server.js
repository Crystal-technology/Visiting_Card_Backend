require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const connectDB = require("@/config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handling
app.use(require("./middleware/errorMiddleware"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

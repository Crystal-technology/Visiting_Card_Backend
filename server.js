require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const connectDB = require("@/config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.use(require("./middleware/errorMiddleware"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

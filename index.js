const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ExpenseRouter = require("./Routes/ExpenseRouter");
const ensureAuthenticated = require("./Middlewares/Auth");
require("./Models/db");

// Use the PORT provided by Render or default to 8080 for local development
const PORT = process.env.PORT || 8080;

// Initialize Express app
const app = express();

// Test route
app.get("/ping", (req, res) => {
  res.send("PONG");
});

// Middleware
app.use(bodyParser.json());

// CORS setup
const allowedOrigins = [
  "https://abdulgithub70.github.io", // GitHub Pages URL without the trailing slash
];

app.use(
  cors({
    origin: allowedOrigins,  // Allow requests only from your GitHub Pages URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific HTTP methods
    credentials: true,  // Allow sending cookies with requests (if needed)
    preflightContinue: false,  // Allow preflight requests to pass
    optionsSuccessStatus: 204,  // Fix for older browsers that may not handle 200 status on preflight
  })
);


// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/expenses", ensureAuthenticated, ExpenseRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

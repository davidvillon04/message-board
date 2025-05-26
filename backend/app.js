require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Import the router modules
const postsRouter = require("./posts");
const usersRouter = require("./users");

// Use the router modules
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

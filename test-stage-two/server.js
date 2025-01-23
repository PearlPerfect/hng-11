const express = require("express");
const userController = require("./controllers/user.controller");

const app = express();

app.post("/auth/register", userController.createUser);
app.post("/auth/login", userController.loginUser);
app.get("/api/users/:id")
app.listen(3000, () => console.log("Server listening on port 3000"));

import express from "express";
import {
  createTask,
  readTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskscontroller.js";

const taskrouter = express.Router();

taskrouter.post("/tasks", createTask);
taskrouter.put("/tasks/:id", updateTask);
taskrouter.delete("/tasks/:id", deleteTask);
taskrouter.get("/tasks", readTasks);

export default taskrouter;

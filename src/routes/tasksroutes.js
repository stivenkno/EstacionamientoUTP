import express from "express";
import {
  createTask,
  readTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskscontroller.js";

const taskrouter = express.Router();

taskrouter.post("/tasks", createTask);
taskrouter.put("/tasks", updateTask);
taskrouter.delete("/tasks", deleteTask);
taskrouter.get("/tasks", readTasks);

export default taskrouter;

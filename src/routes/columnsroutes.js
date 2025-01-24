import express from "express";

import {
  createColumn,
  updateColumn,
  deleteColumn,
  readColumn,
  updateColumnPosition,
} from "../controllers/columnscontroller.js";

const columnrouter = express.Router();

columnrouter.post("/columns", createColumn);
columnrouter.put("/columns/:id", updateColumn);
columnrouter.delete("/columns/:id", deleteColumn);
columnrouter.get("/columns", readColumn);
columnrouter.post("/columns/updatecolumn", updateColumnPosition);

export default columnrouter;

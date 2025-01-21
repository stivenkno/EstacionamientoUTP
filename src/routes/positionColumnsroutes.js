import express from "express";

import {
  updateColumnPosition,
  getColumns,
} from "../controllers/positionColumncontroller.js";

const positionColumnrouter = express.Router();

positionColumnrouter.get("/columns/columns", getColumns);
positionColumnrouter.post("/columns/reorder", updateColumnPosition);

export default positionColumnrouter;

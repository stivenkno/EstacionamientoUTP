import express from "express";
import { getParks } from "../controllers/parkcontroller.js";
import { updatePark } from "../controllers/parkcontroller.js";

const parkrouter = express.Router();

parkrouter.get("/parks", getParks);
parkrouter.put("/updatepark", updatePark);

export default parkrouter;

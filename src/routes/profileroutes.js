import { getProfile, editProfile } from "../controllers/profile.js";
import express from "express";

const profilerouter = express.Router();

profilerouter.get("/profile", getProfile);
profilerouter.put("/editprofile", editProfile);

export default profilerouter;

import { Router } from "express";
import { userCreateController } from "../controllers/userControllers/user.controllers";
const userRoutes = Router();

userRoutes.post("", userCreateController);

export default userRoutes;

import { Router } from "express";

import { userCreateController } from "../controllers/userControllers/user.controller";
const userRoutes = Router();

userRoutes.post("", userCreateController);


export default userRoutes;

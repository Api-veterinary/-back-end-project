import { Router } from "express";
import {
  deleteUserController,
  getUserController,
  updateUserController,
  userCreateController,
} from "../controllers/userControllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.get("", ensureAuthMiddleware, getUserController);

userRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);

userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default userRoutes;

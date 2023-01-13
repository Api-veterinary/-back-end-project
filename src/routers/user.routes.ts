import { Router } from "express";
import { userCreateController } from "../controllers/userControllers/user.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema } from "../schemas/users/users.schema";
const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  userCreateController
);

export default userRoutes;

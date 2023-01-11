import { Router } from "express";
import { createDoctorController, updateDoctorController } from "../controllers/doctors.controller";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureEmailAvailabilityMiddleware,
  createDoctorController
);
doctorsRoutes.patch("/id", ensureEmailAvailabilityMiddleware, updateDoctorController)


export default doctorsRoutes;

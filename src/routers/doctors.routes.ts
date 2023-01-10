import { Router } from "express";
import { createDoctorController } from "../controllers/doctors.controller";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureEmailAvailabilityMiddleware,
  createDoctorController
);

export default doctorsRoutes;

import { Router } from "express";
import { createDoctorController } from "../controllers/doctors.controller";
import ensureCrmvAvailabilityMiddleware from "../middlewares/ensureCrmvAvailability.middleware";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureEmailAvailabilityMiddleware,
  ensureCrmvAvailabilityMiddleware,
  createDoctorController
);

export default doctorsRoutes;

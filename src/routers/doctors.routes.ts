import { Router } from "express";
import { createDoctorController, deleteDoctorController, getDoctorController, updateDoctorController } from "../controllers/doctors.controller";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";
import ensureCrmvAvailabilityMiddleware from "../middlewares/ensureCrmvAvailability.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureEmailAvailabilityMiddleware,
  ensureCrmvAvailabilityMiddleware,
  createDoctorController
);
doctorsRoutes.patch("/id", ensureEmailAvailabilityMiddleware, updateDoctorController)

doctorsRoutes.get("", getDoctorController)

doctorsRoutes.delete("/id", deleteDoctorController)


export default doctorsRoutes;

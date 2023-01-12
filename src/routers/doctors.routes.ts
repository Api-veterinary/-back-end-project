import { Router } from "express";
import { createDoctorController, updateDoctorController } from "../controllers/doctors.controller";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";
import ensureCrmvAvailabilityMiddleware from "../middlewares/ensureCrmvAvailability.middleware";
import getDoctorsService from "../services/doctors/getDoctors.service";
import deleteDoctorService from "../services/doctors/deleteDoctors.service";
const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureEmailAvailabilityMiddleware,
  ensureCrmvAvailabilityMiddleware,
  createDoctorController
);
doctorsRoutes.patch("/id", ensureEmailAvailabilityMiddleware, updateDoctorController)

doctorsRoutes.get("", getDoctorsService)

doctorsRoutes.delete("/id", deleteDoctorService)


export default doctorsRoutes;

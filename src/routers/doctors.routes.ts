import { Router } from "express";
import {
  createDoctorController,
  deleteDoctorController,
  getDoctorController,
  updateDoctorController,
} from "../controllers/doctors.controller";
import ensureEmailAvailabilityMiddleware from "../middlewares/ensureEmailAvailability.middleware";
import ensureCrmvAvailabilityMiddleware from "../middlewares/ensureCrmvAvailability.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { doctorSchema, doctorUpdateSchema } from "../schemas/doctors.schemas";

const doctorsRoutes = Router();

doctorsRoutes.post(
  "",
  ensureDataIsValidMiddleware(doctorSchema),
  ensureEmailAvailabilityMiddleware,
  ensureCrmvAvailabilityMiddleware,
  createDoctorController
);

doctorsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(doctorUpdateSchema),
  ensureDoctorMiddleware,
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  updateDoctorController
);

doctorsRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  getDoctorController
);

doctorsRoutes.delete(
  "/:id",
  ensureDoctorMiddleware,
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteDoctorController
);

export default doctorsRoutes;

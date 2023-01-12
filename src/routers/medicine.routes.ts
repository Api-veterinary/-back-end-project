import { Router } from "express";
import { createMedicineController } from "../controllers/medicine/medicine.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
const medicineRoutes = Router();

medicineRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  createMedicineController
);

export default medicineRoutes;

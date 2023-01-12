import { Router } from "express";
import {
  createMedicineController,
  deleteMedicineController,
  listMedicineController,
} from "../controllers/medicine/medicine.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
const medicineRoutes = Router();

medicineRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  createMedicineController
);
medicineRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  listMedicineController
);
medicineRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteMedicineController
);

export default medicineRoutes;

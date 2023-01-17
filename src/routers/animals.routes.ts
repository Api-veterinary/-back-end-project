import { Router } from "express";
import {
  clearAllAnimalVaccinesController,
  createAnimalsController,
  removeAnimalVaccineController,
} from "../controllers/animals/animals.controller";
import { deleteAnimalsController } from "../controllers/animals/animals.controller";
import { getAnimalsController } from "../controllers/animals/animals.controller";
import { patchAnimalsController } from "../controllers/animals/animals.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";
import { ensureVaccinesAreUnique } from "../middlewares/ensureVaccinesAreUnique.middleware";

export const animalsRoute = Router();

animalsRoute.post("", ensureVaccinesAreUnique, createAnimalsController);

animalsRoute.get("", ensureAuthMiddleware, getAnimalsController);

animalsRoute.get("/:id", ensureAuthMiddleware, getAnimalsController);

animalsRoute.delete("/:id", deleteAnimalsController);

animalsRoute.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureVaccinesAreUnique,
  patchAnimalsController
);

animalsRoute.delete(
  "/vaccines_clear/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  clearAllAnimalVaccinesController
);

animalsRoute.delete("/vaccine_remove/:id", removeAnimalVaccineController);

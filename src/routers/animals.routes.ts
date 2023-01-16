import { Router } from "express";
import { createAnimalsController } from "../controllers/animals/animals.controller";
import { deleteAnimalsController } from "../controllers/animals/animals.controller";
import { getAnimalsController } from "../controllers/animals/animals.controller";
import { patchAnimalsController } from "../controllers/animals/animals.controller";
import { ensureVaccinesAreUnique } from "../middlewares/ensureVaccinesAreUnique.middleware";

export const animalsRoute = Router();

animalsRoute.post("", ensureVaccinesAreUnique, createAnimalsController);
animalsRoute.delete("/:id", deleteAnimalsController);
animalsRoute.patch("/:id", ensureVaccinesAreUnique, patchAnimalsController);
animalsRoute.get("", getAnimalsController);

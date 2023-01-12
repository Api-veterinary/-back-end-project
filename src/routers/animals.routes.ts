import { Router } from "express";
import { createAnimalsController } from "../controllers/animals/createAnimals.controller";
import { deleteAnimalsController } from "../controllers/animals/deleteAnimals.controller";
import { getAnimalsController } from "../controllers/animals/getAnimals.controller";
import { patchAnimalsController } from "../controllers/animals/patchAnimals.controller";
import { getAnimalsService } from "../services/animals/getAnimals.service";

export const animalsRoute = Router();

animalsRoute.post("", createAnimalsController);

animalsRoute.delete("/:id", deleteAnimalsController);
animalsRoute.patch("/:id", patchAnimalsController);
animalsRoute.get("", getAnimalsController);

import { Router } from "express";
import { createAnimalsController } from "../controllers/animals/animals.controller";
import { deleteAnimalsController } from "../controllers/animals/animals.controller";
import { getAnimalsController } from "../controllers/animals/animals.controller";
import { patchAnimalsController } from "../controllers/animals/animals.controller";
import { getAnimalsService } from "../services/animals/getAnimals.service";

export const animalsRoute = Router();

animalsRoute.post("", createAnimalsController);

animalsRoute.delete("/:id", deleteAnimalsController);
animalsRoute.patch("/:id", patchAnimalsController);
animalsRoute.get("", getAnimalsController);

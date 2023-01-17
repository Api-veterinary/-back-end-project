import { Router } from "express";
import {
  createAnimalSizeController,
  deleteAnimalSizeController,
  getAnimalSizeController,
} from "../controllers/animalSize/animalSizes.controller";

export const animalSizesRoutes = Router();

animalSizesRoutes.get("", getAnimalSizeController);
animalSizesRoutes.post("", createAnimalSizeController);
animalSizesRoutes.delete("/:id", deleteAnimalSizeController);

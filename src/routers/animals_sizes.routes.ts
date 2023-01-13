import { Router } from "express";
import { createAnimalSizeController } from "../controllers/animal_size/animal_sizes.controller";
import { deleteAnimalSizeController } from "../controllers/animal_size/animal_sizes.controller";

export const animalSizesRoutes = Router();

animalSizesRoutes.post("", createAnimalSizeController);

animalSizesRoutes.delete("/:id", deleteAnimalSizeController);

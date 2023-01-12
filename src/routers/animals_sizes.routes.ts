import { Router } from "express";
import { createAnimalSizeController } from "../controllers/animal_size/createAnimal_size.controller";

export const animalSizesRoutes = Router();

animalSizesRoutes.post("", createAnimalSizeController);

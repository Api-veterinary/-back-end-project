import { Router } from "express";
import { createAnimals_TypesController } from "../controllers/animals_types/createAnimals_Types.controller";
import { deleteAnimals_TypesController } from "../controllers/animals_types/deleteAnimals_Types.controller";
import { listAnimals_TypesController } from "../controllers/animals_types/listAnimals_Types.controller";
import { updateAnimals_TypesController } from "../controllers/animals_types/updateAnimals_Types.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
import validateSchemaMiddleware from "../middlewares/validadeschema.middleware";
import { animals_TypeSchema } from "../schemas/animals_types/animal_type.schema";

const animalTypesRoutes = Router();

animalTypesRoutes.post("",validateSchemaMiddleware(animals_TypeSchema),ensureAuthMiddleware,
ensureDoctorMiddleware, createAnimals_TypesController);

//O :id é o id do type
animalTypesRoutes.patch("/:id",validateSchemaMiddleware(animals_TypeSchema),ensureAuthMiddleware,
ensureDoctorMiddleware, updateAnimals_TypesController);

animalTypesRoutes.get("",ensureAuthMiddleware,
ensureDoctorMiddleware, listAnimals_TypesController);

//O :id é o id do type
animalTypesRoutes.delete("/:id",ensureAuthMiddleware,
ensureDoctorMiddleware, deleteAnimals_TypesController);

export default animalTypesRoutes;

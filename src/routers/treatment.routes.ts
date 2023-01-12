import { Router } from "express";
import { createTreatmentController } from "../controllers/treatment/createTreatment.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import validateSchemaMiddleware from "../middlewares/validadeschema.middleware";
import { createTreatmentSchema } from "../schemas/treatmentSchema";

const treatmentRoutes = Router();

treatmentRoutes.post(
  "",
  ensureDataIsValidMiddleware(createTreatmentSchema),
  createTreatmentController
);

export default treatmentRoutes;

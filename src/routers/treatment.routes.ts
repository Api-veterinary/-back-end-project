import { Router } from "express";
import {
  createTreatmentController,
  deleteTreatmentController,
  updateTreatmentProcedureController,
} from "../controllers/treatment/treatment.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createTreatmentSchema } from "../schemas/treatment/treatment.schema";
import updatetreatmentProcedureService from "../services/treatment/updateTreatmentProcedure.service";

const treatmentRoutes = Router();

treatmentRoutes.post(
  "",
  ensureDataIsValidMiddleware(createTreatmentSchema),
  createTreatmentController
);

treatmentRoutes.delete("/:id", deleteTreatmentController);

treatmentRoutes.patch(
  "/procedureSchedule/:id",
  updateTreatmentProcedureController
);

export default treatmentRoutes;

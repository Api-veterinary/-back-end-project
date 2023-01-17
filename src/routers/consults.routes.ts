import { Router } from "express";
import {
  createConsultsController,
  deleteConsultsController,
  getConsultByIdController,
  listConsultsController,
  updateConsultsController,
} from "../controllers/consults/consults.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middlewares/validadeschema.middleware";
import {
  createConsultsSchema,
  updateConsultsSchema,
} from "../schemas/consults/consults.schema";

const consultsRoutes = Router();

consultsRoutes.post(
  "",
  ensureAuthMiddleware,
  validateSchemaMiddleware(createConsultsSchema),
  createConsultsController
);

consultsRoutes.delete("/:id", ensureAuthMiddleware, deleteConsultsController);

consultsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateConsultsSchema),
  updateConsultsController
);

consultsRoutes.get("/:id", ensureAuthMiddleware, getConsultByIdController);

consultsRoutes.get("", ensureAuthMiddleware, listConsultsController);

export default consultsRoutes;

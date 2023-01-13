import { Router } from "express";
import {
  createConsultsController,
  deleteConsultsController,
  updateConsultsController,
} from "../controllers/consults/consults.controller";
import validateSchemaMiddleware from "../middlewares/validadeschema.middleware";
import {
  createConsultsSchema,
  updateConsultsSchema,
} from "../schemas/consults/consults.schema";

const consultsRoutes = Router();

//precisa do login, para confirmar a autenticação pelo token
consultsRoutes.post(
  "",
  validateSchemaMiddleware(createConsultsSchema),
  createConsultsController
);

//O :id é o id da consulta
consultsRoutes.delete("/:id", deleteConsultsController);

//O :id é o id da consulta
consultsRoutes.patch(
  "/:id",
  validateSchemaMiddleware(updateConsultsSchema),
  updateConsultsController
);

export default consultsRoutes;

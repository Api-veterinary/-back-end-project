import { Router } from "express";
import {
  createConsultsController,
  deleteConsultsController,
} from "../controllers/consults/consults.controller";

const consultsRoutes = Router();

//precisa do login, para confirmar a autenticação pelo token
consultsRoutes.post("", createConsultsController);

//O :id é o id da consulta
consultsRoutes.delete("/:id", deleteConsultsController);

export default consultsRoutes;

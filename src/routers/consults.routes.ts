import { Router } from "express";
import { createConsultsController } from "../controllers/consults/consults.controller";

const consultsRoutes = Router();

//precisa do login, para confirmar a autenticação pelo token
consultsRoutes.post("", createConsultsController);

export default consultsRoutes;

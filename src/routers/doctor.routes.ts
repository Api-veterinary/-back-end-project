import { Router } from "express";
import { doctorCreateController } from "../controllers/doctorControllers/doctor.controllers";
const doctorRoutes = Router();

doctorRoutes.post("", doctorCreateController);

export default doctorRoutes;

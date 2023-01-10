import { Request, Response } from "express";
import { IDoctorRequest } from "../interfaces/doctors";
import createDoctorService from "../services/doctors/createDoctor.service";

const createDoctorController = async (request: Request, response: Response) => {
  const dataDoctor: IDoctorRequest = request.body;
  const newDoctor = await createDoctorService(dataDoctor);
  return response.status(201).json(newDoctor);
};

export { createDoctorController };

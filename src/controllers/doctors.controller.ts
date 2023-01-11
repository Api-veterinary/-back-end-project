import { Request, Response } from "express";
import { IDoctorUpdate } from "../interfaces/doctor.interface";
import { IDoctorRequest } from "../interfaces/doctors";
import createDoctorService from "../services/doctors/createDoctor.service";
import updateDoctorService from "../services/doctors/updateDoctor.service";

const createDoctorController = async (request: Request, response: Response) => {
  const dataDoctor: IDoctorRequest = request.body;
  const newDoctor = await createDoctorService(dataDoctor);
  return response.status(201).json(newDoctor);
};

const updateDoctorController = async (request: Request, response: Response) => {
  const dataDoctor: IDoctorUpdate = request.body;
  const updatedDoctor = await updateDoctorService(dataDoctor, request.user.id)
  return response.status(201).json(updatedDoctor);
};
export { createDoctorController, updateDoctorController };

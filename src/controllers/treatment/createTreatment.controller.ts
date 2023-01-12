import { Request, Response } from "express";
import createTreatmentService from "../../services/treatment/createTreatment.service";

const createTreatmentController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const newTreatment = await createTreatmentService(data);
  return response.status(201).json(newTreatment);
};

export { createTreatmentController };

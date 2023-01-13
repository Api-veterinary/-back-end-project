import { Request, Response } from "express";
import createTreatmentService from "../../services/treatment/createTreatment.service";
import deleteTreatmentService from "../../services/treatment/deleteTreatment.service";
import updatetreatmentService from "../../services/treatment/updateTreatment.service";
import updatetreatmentProcedureService from "../../services/treatment/updateTreatmentProcedure.service";

const createTreatmentController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const newTreatment = await createTreatmentService(data);
  return response.status(201).json(newTreatment);
};

const deleteTreatmentController = async (
  request: Request,
  response: Response
) => {
  const treatmentId = request.params.id;
  await deleteTreatmentService(treatmentId);
  return response.status(204).json({});
};

const updateTreatmentProcedureController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const id = request.params.id;
  const newTreatment = await updatetreatmentProcedureService(id, data);
  return response.status(201).json(newTreatment);
};

const updatetreatmentController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const id = request.params.id;
  const newTreatment = await updatetreatmentService(id, data);
  return response.status(201).json(newTreatment);
};

export {
  createTreatmentController,
  deleteTreatmentController,
  updateTreatmentProcedureController,
  updatetreatmentController,
};

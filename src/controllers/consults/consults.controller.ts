import { Request, Response } from "express";
import createConsultsService from "../../services/consults/createConsults.service";
import deleteConsultsService from "../../services/consults/deleteConsults.service";
import updateConsultsService from "../../services/consults/updateConsults.service";

const createConsultsController = async (
  request: Request,
  response: Response
) => {
  const consultsData = request.body;
  const newConsults = await createConsultsService(consultsData);
  return response.status(201).json(newConsults);
};

const updateConsultsController = async (
  request: Request,
  response: Response
) => {
  const id = request.params.id;
  const data = request.body;
  const updatedConsults = await updateConsultsService(data, id);
  return response.status(200).json(updatedConsults);
};

const deleteConsultsController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  await deleteConsultsService(id);
  return response.status(204).json({});
};

export {
  createConsultsController,
  deleteConsultsController,
  updateConsultsController,
};

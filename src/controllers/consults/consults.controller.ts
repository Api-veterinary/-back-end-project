import { Request, Response } from "express";
import createConsultsService from "../../services/consults/createConsults.service";
import deleteConsultsService from "../../services/consults/deleteConsults.service";

const createConsultsController = async (
  request: Request,
  response: Response
) => {
  const consultsData = request.body;
  const newConsults = await createConsultsService(consultsData);
  return response.status(201).json(newConsults);
};

const deleteConsultsController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  await deleteConsultsService(id);
  return response.status(204).json({});
};

export { createConsultsController, deleteConsultsController };

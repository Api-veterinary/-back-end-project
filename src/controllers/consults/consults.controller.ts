import { Request, Response } from "express";
import createConsultsService from "../../services/consults/createConsults.service";

const createConsultsController = async (
  request: Request,
  response: Response
) => {
  const consultsData = request.body;
  const newConsults = await createConsultsService(consultsData);
  return response.status(201).json(newConsults);
};

export { createConsultsController };

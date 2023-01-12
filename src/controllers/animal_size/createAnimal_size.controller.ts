import { Request, Response } from "express";
import { createAnimalSizeService } from "../../services/animals_size/createAnimals_size.service";

export const createAnimalSizeController = async (
  request: Request,
  response: Response
) => {
  const data = await createAnimalSizeService(request.body.size);

  return response.status(201).json(data);
};

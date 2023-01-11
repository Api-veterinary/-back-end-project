import { Request, Response } from "express";
import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";
import { createAnimals_TypesService } from "../../services/animals_types/createAnimals_TypesService.service";

export const createAnimals_TypesController = async (req: Request, res: Response) => {

  console.log(req.body)
  const data : IAnimals_TypesRequest = req.body;
  const newAnimals = await createAnimals_TypesService(data);

  return res.status(201).json(newAnimals);
};

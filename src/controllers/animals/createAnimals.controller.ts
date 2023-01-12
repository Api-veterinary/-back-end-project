import { Request, Response } from "express";
import { createAnimalsService } from "../../services/animals/createAnimals.service";

export const createAnimalsController = async (req: Request, res: Response) => {
  const data = req.body;

  const animalData = await createAnimalsService(data);

  return res.status(201).json(animalData);
};

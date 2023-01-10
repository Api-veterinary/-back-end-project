import { Request, Response } from "express";
import { createAnimalsService } from "../../services/animals/createAnimalsService";

export const createAnimalsController = async (req: Request, res: Response) => {
  const data = req.body;
  const newAnimals = createAnimalsService(data);

  return res.status(201).json(newAnimals);
};

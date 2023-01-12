import { Request, Response } from "express";
import { getAnimalsService } from "../../services/animals/getAnimals.service";

export const getAnimalsController = async (req: Request, res: Response) => {
  const data = req.params.id;

  const animalData = await getAnimalsService();

  return res.status(200).json(animalData);
};

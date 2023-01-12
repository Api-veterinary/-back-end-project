import { Request, Response } from "express";
import { patchAnimalsService } from "../../services/animals/patchAnimals.service";

export const patchAnimalsController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;

  const newAnimalData = await patchAnimalsService(data, id);

  return res.status(200).json(newAnimalData);
};

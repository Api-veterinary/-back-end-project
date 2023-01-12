import { Request, Response } from "express";
import { createAnimalsService } from "../../services/animals/createAnimalsService";
import { updateAnimals_TypesService } from "../../services/animals_types/updateAnimals_Types.service";

export const updateAnimals_TypesController = async (req: Request, res: Response) => {
  const data = req.body;
  const id: string = req.params.id
  const patchType = await updateAnimals_TypesService(data,id);

  return res.status(201).json(patchType);
};

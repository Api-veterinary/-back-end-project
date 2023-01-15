import { Request, Response } from "express";
import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";
import { updateAnimals_TypesService } from "../../services/animals_types/updateAnimals_Types.service";

export const updateAnimals_TypesController = async (
  req: Request,
  res: Response
) => {
  const data : IAnimals_TypesRequest = req.body;
  const id: string = req.params.id;
  const patchType = await updateAnimals_TypesService(data, id);

  return res.status(201).json(patchType);
};

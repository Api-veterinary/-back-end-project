import { Request, Response } from "express";
import deleteAnimals_TypeService from "../../services/animals_types/deleteAnimals_Types.service";

export const deleteAnimals_TypesController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  await deleteAnimals_TypeService(id);

  return res.status(204).json({});
};

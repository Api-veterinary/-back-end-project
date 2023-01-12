import { Request, Response } from "express";
import { animals_TypesCategoryService } from "../../services/animals_types/listAnimals_Types.service";

export const listAnimals_TypesController = async (req: Request, res: Response) => {

  const Types = await animals_TypesCategoryService();

  return res.status(201).json(Types);
};

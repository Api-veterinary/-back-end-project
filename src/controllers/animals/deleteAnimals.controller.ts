import { Request, Response } from "express";
import { deleteAnimalsService } from "../../services/animals/deleteAnimal.service";

export const deleteAnimalsController = async (req: Request, res: Response) => {
  const data = req.params.id;

  await deleteAnimalsService(data);

  return res.status(200).send();
};

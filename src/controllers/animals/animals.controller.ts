import { Request, Response } from "express";
import { createAnimalsService } from "../../services/animals/createAnimals.service";
import { deleteAnimalsService } from "../../services/animals/deleteAnimal.service";
import { getAnimalsService } from "../../services/animals/getAnimals.service";
import { patchAnimalsService } from "../../services/animals/patchAnimals.service";

export const getAnimalsController = async (req: Request, res: Response) => {
  const data = req.params.id;

  const animalData = await getAnimalsService();

  return res.status(200).json(animalData);
};

export const createAnimalsController = async (req: Request, res: Response) => {
  const data = req.body;

  const animalData = await createAnimalsService(data);

  return res.status(201).json(animalData);
};

export const deleteAnimalsController = async (req: Request, res: Response) => {
  const data = req.params.id;

  await deleteAnimalsService(data);

  return res.status(200).send();
};

export const patchAnimalsController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;

  const newAnimalData = await patchAnimalsService(data, id);

  return res.status(200).json(newAnimalData);
};

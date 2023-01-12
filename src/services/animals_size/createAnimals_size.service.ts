import AppDataSource from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";

export const createAnimalSizeService = async (animalSize: string) => {
  const animalSizeRepo = AppDataSource.getRepository(AnimalSizes);

  return await animalSizeRepo.save({ size: animalSize });
};

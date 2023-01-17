import { AppDataSource } from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import { AppError } from "../../errors/appError";

export const createAnimalSizeService = async (animalSize: string) => {
  const animalSizeRepo = AppDataSource.getRepository(AnimalSizes);

  const exist = await animalSizeRepo.findOneBy({ size: animalSize });

  if (exist !== null) {
    throw new AppError("size already exist");
  }

  return await animalSizeRepo.save({ size: animalSize });
};

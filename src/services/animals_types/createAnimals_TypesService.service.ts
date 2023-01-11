import AppDataSource from "../../data-source";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import AppError from "../../errors/appError";
import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";

export const createAnimals_TypesService = async (data : IAnimals_TypesRequest): Promise<Animal_types> => {
  const animals_TypesRepository = AppDataSource.getRepository(Animal_types);

  const animals_TypesExist = await animals_TypesRepository.findOneBy({
    type: data.type,
  });

  if (animals_TypesExist) {
    throw new AppError("Type already exist", 409);
  }

  const newAnimalType = animals_TypesRepository.create(data);

  await animals_TypesRepository.save(newAnimalType);

  return newAnimalType;
};

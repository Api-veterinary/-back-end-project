import AppDataSource from "../../data-source";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import AppError from "../../errors/appError";
import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";

export const updateAnimals_TypesService = async (data : IAnimals_TypesRequest,id : string): Promise<Animal_types> => {
  const animals_TypesRepository = AppDataSource.getRepository(Animal_types);

  const animals_TypesExist = await animals_TypesRepository.findOneBy({
    type: data.type,
  });

  const findAnimalTypeID = await animals_TypesRepository.findOneBy({ id: id });

  if (animals_TypesExist) {
    throw new AppError("Same type found", 404);
  }

  if (!findAnimalTypeID) {
    throw new AppError("Id not found", 404);
  }

  const updatedAnimalType = animals_TypesRepository.create(data);

  await animals_TypesRepository.save(updatedAnimalType);

  return updatedAnimalType;
};

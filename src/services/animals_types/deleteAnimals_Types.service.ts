import AppDataSource from "../../data-source";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { Consults } from "../../entities/consults/consults.entity";
import AppError from "../../errors/appError";

const deleteAnimals_TypeService = async (id: string): Promise<void> => {
  const Animal_TypesRepository = AppDataSource.getRepository(Animal_types);
  const findAnimalType = await Animal_TypesRepository.findOneBy({ id: id });
  if (!findAnimalType) {
    throw new AppError("Animal type not found", 404);
  }
  Animal_TypesRepository.remove(findAnimalType);
};

export default deleteAnimals_TypeService;

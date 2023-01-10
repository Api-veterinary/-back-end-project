import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";

export const createAnimalsService = async (data): Promise<Animals[]> => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const newAnimals = animalsRepository.create(data);

  await animalsRepository.save(newAnimals);

  return newAnimals;
};

import AppDataSource from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import AppError from "../../errors/appError";

const deleteAnimalSizeService = async (animalSizeId: string) => {
  const animalSizeRepository = AppDataSource.getRepository(AnimalSizes);

  await animalSizeRepository
    .createQueryBuilder()
    .delete()
    .where({ id: animalSizeId })
    .execute();
};

export default deleteAnimalSizeService;

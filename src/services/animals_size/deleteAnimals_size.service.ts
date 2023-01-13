import AppDataSource from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import AppError from "../../errors/appError";

const deleteAnimalSizeService = async (animalSizeId: string) => {
  const animalSizeRepository = AppDataSource.getRepository(AnimalSizes);

  const findAnimalSize = await animalSizeRepository.findOneBy({
    id: animalSizeId,
  });
  if (!findAnimalSize) {
    throw new AppError("Id not found", 404);
  }
  if (!findAnimalSize.isActive) {
    throw new AppError("User does not exist", 400);
  }

  findAnimalSize.isActive = false;

  await animalSizeRepository.save(findAnimalSize);
};

export default deleteAnimalSizeService;

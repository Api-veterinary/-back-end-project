import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { animalsWithoutPasswordSchema } from "../../schemas/animalsSchema";

export const createAnimalsService = async (data) => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const newAnimals = animalsRepository.create(data);

  await animalsRepository.save(newAnimals);

  const animalsWithoutPassord = await animalsWithoutPasswordSchema.validate(
    newAnimals,
    {
      stripUnknown: true,
    }
  );
  return animalsWithoutPassord;
};

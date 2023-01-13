import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import AppError from "../../errors/appError";

export const deleteAnimalsService = async (animalID: string) => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const exist = await animalsRepository.findOneBy({ id: animalID });

  console.log(exist);

  if (exist === null) {
    throw new AppError("Animal não existe", 400);
  }

  const teste = await animalsRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: animalID })
    .execute();

  return teste;
};

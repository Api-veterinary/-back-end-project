import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { VaccinesAplication } from "../../entities/vaccines_aplied/vaccinesAplied.entity";
import AppError from "../../errors/appError";

export const clearAllAnimalVaccinesService = async (animalID: string) => {
  const animalRepo = AppDataSource.getRepository(Animals);

  const animal = await animalRepo.findOneBy({ id: animalID });

  if (animal === null) {
    throw new AppError("Animal não encontrado", 404);
  }

  animal.vaccines_aplications = [];

  const resAnimal = await animalRepo.save(animal);

  console.log(resAnimal);

  return resAnimal;
};

export const removeAnimalVaccineService = async (
  animalID: string,
  vaccinesIDS: Array<string>
) => {
  const animalRepo = AppDataSource.getRepository(Animals);
  const vaccineRepo = AppDataSource.getRepository(VaccinesAplication);
  const vaccineQuery = vaccineRepo.createQueryBuilder();

  const animal = await animalRepo.findOneBy({ id: animalID });

  if (animal === null) {
    throw new AppError("Animal não encontrado", 404);
  }

  console.log(animal);

  vaccinesIDS.forEach((x) => {
    vaccineQuery.delete().where("id = :id", { id: x }).execute();
  });
};

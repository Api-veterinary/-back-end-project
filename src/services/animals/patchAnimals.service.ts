import { application } from "express";
import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { VaccinesAplication } from "../../entities/vaccines_aplied/vaccinesAplied.entity";
import AppError from "../../errors/appError";
import { animal_type } from "../../__tests__/mocks/animal_type.mocks";

export const patchAnimalsService = async (newAnimalData, animalID: string) => {
  const animalsRepository = AppDataSource.getRepository(Animals);
  const vaccinesRepository = AppDataSource.getRepository(VaccinesAplication);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const exist = await animalsRepository.findOne({
    where: { id: animalID },
    relations: {
      size: true,
      type: true,
      vaccines_aplications: {
        vaccine: true,
      },
    },
  });

  console.log(exist);

  const oldVaccines = exist.vaccines_aplications;

  if (exist === null) {
    throw new AppError("Animal não existe", 400);
  }

  if (Object.keys(newAnimalData).includes("size")) {
    const sizeRepo = AppDataSource.getRepository(AnimalSizes);
    const exists = await sizeRepo.findOneBy({ size: newAnimalData.size });

    if (exist === null) {
      throw new AppError("Opções de tamanho: Pequeno, Médio, Grande");
    } else {
      newAnimalData.size = exists;
    }
  }

  if (Object.keys(newAnimalData).includes("type")) {
    const typeRepo = AppDataSource.getRepository(Animal_types);
    const exists = await typeRepo.findOneBy({ type: newAnimalData.type });

    if (exist === null) {
      throw new AppError(
        "Tipo de animal indisponível, tente: Cachorro, Gato, Ave...."
      );
    } else {
      newAnimalData.type = exists;
    }
  }

  if (
    Object.keys(newAnimalData).includes("vaccines") &&
    newAnimalData.vaccines.length >= 1
  ) {
    const aplicationsData = await Promise.all(
      newAnimalData.vaccines.map(
        async (vaccine: { id: Array<string>; date: string }) => {
          const medicine = await Promise.all(
            vaccine.id.map(async (id) => {
              const res = await medicineRepository.findOneBy({ id: id });
              return res;
            })
          );
          const res = { vaccine: medicine, date_aplied: vaccine.date };

          return res;
        }
      )
    );

    const aplications = await Promise.all(
      aplicationsData.map(async (aplication) => {
        const res = vaccinesRepository.save({
          vaccine: aplication.vaccine,
          date_aplied: aplication.date_aplied,
          animal: exist,
        });
        return res;
      })
    );

    aplications.forEach((application) => {
      oldVaccines.push(application);
    });

    delete newAnimalData.vaccines;

    exist.vaccines_aplications = oldVaccines;
  }

  const updatedAnimal = animalsRepository.save({
    ...exist,
    ...newAnimalData,
    vaccines_aplications: oldVaccines,
  });

  const res = animalsRepository.findOne({
    where: {
      id: exist.id,
    },
    relations: {
      owner: true,
      size: true,
      type: true,
      vaccines_aplications: {
        vaccine: true,
      },
    },
  });

  return res;
};

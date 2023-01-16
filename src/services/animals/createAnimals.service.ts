import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Users } from "../../entities/users/users.entity";
import { VaccinesAplication } from "../../entities/vaccines_aplied/vaccinesAplied.entity";
import AppError from "../../errors/appError";
import { createAnimalsSchema } from "../../schemas/animals/animals.schema";

export const createAnimalsService = async (data) => {
  const vaccinesRepository = AppDataSource.getRepository(VaccinesAplication);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const sizeRepository = AppDataSource.getRepository(AnimalSizes);
  const typeRepository = AppDataSource.getRepository(Animal_types);
  const userRepository = AppDataSource.getRepository(Users);
  const animalsRepository = AppDataSource.getRepository(Animals);

  let owner = null;

  if (data.owner.length > 10) {
    owner = await userRepository.findOneBy({ id: data.owner });
  }
  const size = await sizeRepository.findOneBy({ size: data.size });

  console.log(data.size);
  const type: any = await typeRepository.findOneBy({ type: data.type });

  if (size === null) {
    throw new AppError("Porte: Pequeno, Médio, Grande", 400);
  }

  if (type === null) {
    throw new AppError(
      "Tipo de animal inválido, tente: Cachorro, Gato, Ave, Tartaruga....",
      400
    );
  }

  const aplicationsData = await Promise.all(
    data.vaccines.map(async (vaccine: { id: Array<string>; date: string }) => {
      const medicine = await Promise.all(
        vaccine.id.map(async (id) => {
          const res = await medicineRepository.findOneBy({ id: id });
          return res;
        })
      );
      const res = { vaccine: medicine, date_aplied: vaccine.date };

      return res;
    })
  );

  const animal = await animalsRepository.save({
    ...data,
    size: size,
    type: type,
    owner: owner,
  });

  const aplications = await Promise.all(
    aplicationsData.map(async (aplication) => {
      const res = vaccinesRepository.save({
        vaccine: aplication.vaccine,
        date_aplied: aplication.date_aplied,
        animal: animal,
      });
      return res;
    })
  );

  const vaccinatedAnimal = await animalsRepository.findOne({
    where: { id: animal.id },
    relations: ["owner", "type", "size"],
  });

  const newAnimal = await animalsRepository.save({
    ...vaccinatedAnimal,
    aplications,
  });

  const animalsWithoutPassord = await createAnimalsSchema.validate(newAnimal, {
    stripUnknown: true,
  });

  return animalsWithoutPassord;
};

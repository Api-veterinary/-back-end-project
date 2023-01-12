import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { VaccinesAplication } from "../../entities/vaccines_aplied/vaccinesAplied.entity";
import AppError from "../../errors/appError";

export const patchAnimalsService = async (newAnimalData, animalID: string) => {
  const animalsRepository = AppDataSource.getRepository(Animals);
  const vaccinesRepository = AppDataSource.getRepository(VaccinesAplication);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const exist = await animalsRepository.findOneBy({ id: animalID });

  console.log(exist);

  if (
    Object.keys(newAnimalData).includes("vaccines") &&
    newAnimalData.vaccines.length >= 1
  ) {

    const aplicationsData = newAnimalData.vaccines.map(
      async (vaccine: { id: Array<string>; date: string }) => {
        console.log(vaccine);
        const medicine = await Promise.all(
          vaccine.id.map(async (id) => {
            const res = await medicineRepository.findOneBy({ id: id });
            return res;
          })
        );
        const res = { vaccine: medicine, date_aplied: vaccine.date };

        return res;
      }
    );
    console.log(aplicationsData);
  }
  if (exist === null) {
    throw new AppError("Animal não existe", 400);
  }
};
